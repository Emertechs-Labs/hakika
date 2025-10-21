import React from 'react';
import { MeshProvider, useWallet } from '@meshsdk/react';

function WalletConnect() {
  const { connect, wallet, disconnect } = useWallet();

  return (
    <div className="p-4">
      {!wallet ? (
        <button onClick={() => connect('yoroi')} className="bg-green-500 text-white p-2 rounded">
          Connect Cardano Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {wallet.name}</p>
          <button onClick={disconnect} className="bg-red-500 text-white p-2 rounded ml-2">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
