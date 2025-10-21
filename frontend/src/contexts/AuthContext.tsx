import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useWallet } from "@meshsdk/react";
import axios from "axios";

interface User {
  walletAddress: string;
  reputation: number;
  badges: string[];
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isConnecting: boolean;
  connectWallet: (walletName: string) => Promise<void>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { connect, wallet, disconnect: meshDisconnect, error: meshError } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("hakika-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Handle wallet connection changes
    const handleWalletChange = async () => {
      if (wallet) {
        try {
          const address = await wallet.getChangeAddress();
          const stakeAddress = await wallet.getRewardAddresses();

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
        }
      } else {
        setUser(null);
        localStorage.removeItem("hakika-user");
      }
    };

    handleWalletChange();
  }, [wallet]);

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    try {
      await connect(walletName);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    meshDisconnect();
    setUser(null);
    localStorage.removeItem("hakika-user");
  };

  return (
    <AuthContext.Provider value={{ user, isConnecting, connectWallet, disconnectWallet }}>
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
