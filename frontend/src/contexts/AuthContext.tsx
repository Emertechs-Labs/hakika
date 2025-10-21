import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  address: string;
  reputation: number;
  badges: string[];
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock wallet connection for demo
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("hakika-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Mock Web3 wallet connection
      // In production, integrate with ethers.js or web3.js
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        address: "0x" + Math.random().toString(16).substr(2, 40),
        reputation: Math.floor(Math.random() * 1000) + 100,
        badges: ["Early Adopter", "Fact Checker"],
        verified: true,
      };
      
      setUser(mockUser);
      localStorage.setItem("hakika-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
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
