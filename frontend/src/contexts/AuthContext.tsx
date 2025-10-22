import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

interface User {
  walletAddress: string;
  reputation: number;
  badges: string[];
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isConnecting: boolean;
  availableWallets: Array<{ name: string; apiVersion: string }>;
  connectWallet: (walletName: string) => Promise<void>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced CIP-30 wallet connector
class CardanoWalletConnector {
  private walletApi: any = null;
  private walletName: string = '';
  private connected: boolean = false;

  // Get available wallets
  getAvailableWallets(): Array<{ name: string; apiVersion: string }> {
    if (!(window as any).cardano) {
      return [];
    }

    const wallets = [];
    const cardano = (window as any).cardano;

    // Check for common wallet extensions
    const walletNames = ['nami', 'eternl', 'yoroi', 'flint', 'gerowallet', 'typhoncip30'];

    for (const walletName of walletNames) {
      if (cardano[walletName] && typeof cardano[walletName].enable === 'function') {
        try {
          wallets.push({
            name: walletName,
            apiVersion: cardano[walletName].apiVersion || '1.0.0'
          });
        } catch (error) {
          console.warn(`Error checking wallet ${walletName}:`, error);
        }
      }
    }

    return wallets;
  }

  async connect(walletName: string): Promise<void> {
    if (!(window as any).cardano) {
      throw new Error('Cardano wallet extensions not found. Please install a Cardano wallet like Nami, Eternl, or Yoroi.');
    }

    const cardano = (window as any).cardano;

    if (!cardano[walletName]) {
      throw new Error(`${walletName} wallet not found. Please install it first.`);
    }

    if (typeof cardano[walletName].enable !== 'function') {
      throw new Error(`${walletName} wallet does not support CIP-30 standard.`);
    }

    try {
      this.walletApi = await cardano[walletName].enable();
      this.walletName = walletName;
      this.connected = true;
    } catch (error) {
      this.connected = false;
      throw new Error(`Failed to connect to ${walletName}: ${error.message}`);
    }
  }

  async getChangeAddress(): Promise<string> {
    if (!this.connected || !this.walletApi) {
      throw new Error('Wallet not connected');
    }

    try {
      // Try to get used addresses first (more reliable)
      const usedAddresses = await this.walletApi.getUsedAddresses();
      if (usedAddresses && usedAddresses.length > 0) {
        return usedAddresses[0];
      }

      // Fallback to unused addresses
      const unusedAddresses = await this.walletApi.getUnusedAddresses();
      if (unusedAddresses && unusedAddresses.length > 0) {
        return unusedAddresses[0];
      }

      // Last resort: get change address directly
      const changeAddress = await this.walletApi.getChangeAddress();
      if (changeAddress) {
        return changeAddress;
      }

      throw new Error('No addresses available from wallet');
    } catch (error) {
      console.error('Error getting wallet address:', error);
      throw new Error(`Failed to get wallet address: ${error.message}`);
    }
  }

  async getBalance(): Promise<string> {
    if (!this.connected || !this.walletApi) {
      return '0';
    }

    try {
      const balance = await this.walletApi.getBalance();
      return balance;
    } catch (error) {
      console.warn('Failed to get balance:', error);
      return '0';
    }
  }

  disconnect(): void {
    this.walletApi = null;
    this.walletName = '';
    this.connected = false;
  }

  isConnected(): boolean {
    return this.connected;
  }

  getWalletName(): string {
    return this.walletName;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletConnector] = useState(() => new CardanoWalletConnector());
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<Array<{ name: string; apiVersion: string }>>([]);

  // Set axios base URL
  axios.defaults.baseURL = API_BASE_URL;

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("hakika-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Update available wallets
    const updateWallets = () => {
      setAvailableWallets(walletConnector.getAvailableWallets());
    };

    updateWallets();

    // Check for wallets periodically (in case user installs one)
    const interval = setInterval(updateWallets, 2000);
    return () => clearInterval(interval);
  }, [walletConnector]);

  useEffect(() => {
    // Handle wallet connection changes
    const handleWalletChange = async () => {
      if (walletConnector.isConnected()) {
        try {
          const address = await walletConnector.getChangeAddress();

          // Fetch or create user profile from backend
          try {
            const response = await axios.get(`/api/users/${encodeURIComponent(address)}`);
            let userData = response.data;

            if (!userData) {
              // Create new user if doesn't exist
              const createResponse = await axios.post(`/api/users/${encodeURIComponent(address)}/profile`);
              userData = createResponse.data;
            }

            const userProfile: User = {
              walletAddress: address,
              reputation: userData.reputation || 0,
              badges: userData.badges || [],
              verified: userData.badges?.includes("Verified") || false,
            };

            setUser(userProfile);
            localStorage.setItem("hakika-user", JSON.stringify(userProfile));
          } catch (backendError) {
            console.warn("Backend not available, using local wallet data:", backendError);
            // Fallback to local-only mode if backend is unavailable
            const userProfile: User = {
              walletAddress: address,
              reputation: 0,
              badges: ["New User"],
              verified: false,
            };

            setUser(userProfile);
            localStorage.setItem("hakika-user", JSON.stringify(userProfile));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // If we can't get the address, disconnect
          walletConnector.disconnect();
          setUser(null);
        }
      } else {
        setUser(null);
        localStorage.removeItem("hakika-user");
      }
    };

    handleWalletChange();
  }, [walletConnector]);

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    try {
      await walletConnector.connect(walletName);
      // Force a re-render to trigger the useEffect
      setUser(prev => prev);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    walletConnector.disconnect();
    setUser(null);
    localStorage.removeItem("hakika-user");
  };

  return (
    <AuthContext.Provider value={{ user, isConnecting, availableWallets, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
