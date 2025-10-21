import React, { useState } from 'react';
import { useWallet } from '@meshsdk/react';
import axios from 'axios';

const ClaimReward = ({ score }) => {
  const { wallet } = useWallet();
  const [claiming, setClaiming] = useState(false);

  const claimReward = async () => {
    if (!wallet) {
      alert('Please connect your wallet first.');
      return;
    }
    setClaiming(true);
    try {
      const address = await wallet.getChangeAddress();
      const response = await axios.post('http://localhost:5000/api/reward', {
        walletAddress: address,
        score
      });
      alert(`Reward claimed! Transaction: ${response.data.txHash}`);
    } catch (err) {
      alert('Error claiming reward. Try again.');
    } finally {
      setClaiming(false);
    }
  };

  if (score < 70) return null; // Only show for high scores

  return (
    <div className="mt-4 p-4 bg-green-100 rounded">
      <p>Congrats! Your post scored {score}/100. Claim your Cardano reputation token:</p>
      <button
        onClick={claimReward}
        className="mt-2 bg-green-500 text-white p-2 rounded"
        disabled={claiming}
      >
        {claiming ? 'Claiming...' : 'Claim Reward'}
      </button>
    </div>
  );
};

export default ClaimReward;
