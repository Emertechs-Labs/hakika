// Mock IPFS upload for demo purposes
// In production, integrate with proper IPFS client

export const uploadToIPFS = async (file: File): Promise<string> => {
  // For demo, return a mock URL
  // Replace with actual IPFS upload logic
  console.warn('IPFS upload mocked for demo');
  return `https://ipfs.io/ipfs/mock-cid/${file.name}`;
};

export const uploadJSONToIPFS = async (data: object): Promise<string> => {
  console.warn('IPFS JSON upload mocked for demo');
  return `https://ipfs.io/ipfs/mock-json-cid`;
};