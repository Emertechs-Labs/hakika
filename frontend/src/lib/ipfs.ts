import { Web3Storage } from 'web3.storage';

const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN; // You'll need to set this

export const client = new Web3Storage({ token });

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const cid = await client.put([file]);
    return `https://${cid}.ipfs.w3s.link/${file.name}`;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (data: object): Promise<string> => {
  try {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], 'data.json');
    const cid = await client.put([file]);
    return `https://${cid}.ipfs.w3s.link/data.json`;
  } catch (error) {
    console.error('IPFS JSON upload failed:', error);
    throw error;
  }
};