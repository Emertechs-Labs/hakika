import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

function WalletConnect() {
  const { user, isConnecting, availableWallets, connectWallet, disconnectWallet } = useAuth();

  const handleConnect = async (walletName) => {
    try {
      await connectWallet(walletName);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Connect Cardano Wallet</h3>
        </div>

        {!user ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Cardano wallet to access Hakika's verification features and earn reputation.
            </p>
            {availableWallets.length > 0 ? (
              availableWallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  disabled={isConnecting}
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  {isConnecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wallet className="h-4 w-4" />
                  )}
                  Connect {wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}
                </Button>
              ))
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No Cardano wallets detected. Please install a wallet extension like Nami, Eternl, or Yoroi.
                </AlertDescription>
              </Alert>
            )}
            {isConnecting && (
              <p className="text-sm text-muted-foreground text-center">
                Connecting to wallet...
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Connected to Cardano wallet
                <br />
                <span className="font-mono text-xs">
                  {user?.walletAddress ? `${user.walletAddress.slice(0, 8)}...${user.walletAddress.slice(-8)}` : '—'}
                </span>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center p-2 bg-muted rounded">
                <div className="font-semibold">{user.reputation}</div>
                <div className="text-muted-foreground">Reputation</div>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <div className="font-semibold">{user.badges.length}</div>
                <div className="text-muted-foreground">Badges</div>
              </div>
            </div>

            <Button onClick={disconnectWallet} variant="destructive" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default WalletConnect;
