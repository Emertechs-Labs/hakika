import React, { useState } from 'react';
import { MeshProvider, useWallet } from '@meshsdk/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';

function WalletConnect() {
  const { connect, wallet, disconnect, error } = useWallet();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (walletName) => {
    setConnecting(true);
    try {
      await connect(walletName);
    } catch (err) {
      console.error('Connection failed:', err);
    } finally {
      setConnecting(false);
    }
  };

  const wallets = ['yoroi', 'eternl', 'nami']; // Common Cardano wallets

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
        </div>

        {!wallet ? (
          <div className="space-y-3">
            {wallets.map((walletName) => (
              <Button
                key={walletName}
                onClick={() => handleConnect(walletName)}
                disabled={connecting}
                className="w-full justify-start gap-2"
                variant="outline"
              >
                <Wallet className="h-4 w-4" />
                Connect {walletName.charAt(0).toUpperCase() + walletName.slice(1)}
              </Button>
            ))}
            {connecting && <p className="text-sm text-muted-foreground">Connecting...</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Connected to {wallet.name}
              </AlertDescription>
            </Alert>
            <Button onClick={disconnect} variant="destructive" className="w-full">
              Disconnect
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || 'Connection failed. Please try again.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default WalletConnect;
