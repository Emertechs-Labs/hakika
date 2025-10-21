export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    address: string;
    verified: boolean;
  };
  niche: string;
  verified: boolean;
  likes: number;
  comments: number;
  timestamp: string;
  image?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    address: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export const NICHES = [
  "All",
  "Sports",
  "Fashion",
  "Entertainment",
  "Lifestyle",
  "Technology",
  "Politics",
  "Health",
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Breaking: Major Championship Victory Reshapes Tennis Rankings",
    excerpt:
      "In a stunning upset at the Grand Slam finals, the underdog champion defeated the world number one in a five-set thriller that will be remembered for years.",
    content: "Full article content here...",
    author: {
      name: "SportsTruth",
      address: "0x1234567890abcdef",
      verified: true,
    },
    niche: "Sports",
    verified: true,
    likes: 342,
    comments: 45,
    timestamp: "2h ago",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=450&fit=crop",
  },
  {
    id: "2",
    title: "Sustainable Fashion: The Future of Luxury Brands",
    excerpt:
      "Top designers are leading the eco-revolution in high fashion, proving that sustainability and luxury can coexist beautifully.",
    content: "Full article content here...",
    author: {
      name: "FashionForward",
      address: "0xabcdef1234567890",
      verified: true,
    },
    niche: "Fashion",
    verified: true,
    likes: 567,
    comments: 89,
    timestamp: "5h ago",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=450&fit=crop",
  },
  {
    id: "3",
    title: "Exclusive: Behind the Scenes of Hollywood's Biggest Blockbuster",
    excerpt:
      "Get an inside look at the making of this summer's most anticipated film, including interviews with the cast and crew.",
    content: "Full article content here...",
    author: {
      name: "EntertainmentInsider",
      address: "0x9876543210fedcba",
      verified: true,
    },
    niche: "Entertainment",
    verified: true,
    likes: 891,
    comments: 156,
    timestamp: "1d ago",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
  },
  {
    id: "4",
    title: "10 Lifestyle Hacks for a Healthier Morning Routine",
    excerpt:
      "Transform your mornings with these evidence-based tips from wellness experts, designed for busy professionals.",
    content: "Full article content here...",
    author: {
      name: "WellnessWise",
      address: "0xfedcba0987654321",
      verified: false,
    },
    niche: "Lifestyle",
    verified: false,
    likes: 234,
    comments: 67,
    timestamp: "3d ago",
  },
  {
    id: "5",
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    excerpt:
      "From healthcare to finance, artificial intelligence is reshaping how we work and live. Here's what you need to know.",
    content: "Full article content here...",
    author: {
      name: "TechVision",
      address: "0x1111222233334444",
      verified: true,
    },
    niche: "Technology",
    verified: true,
    likes: 1023,
    comments: 203,
    timestamp: "6h ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: {
      name: "TennisEnthusiast",
      address: "0x5555666677778888",
    },
    content: "This was an incredible match! The comeback in the fourth set was absolutely legendary.",
    timestamp: "1h ago",
    likes: 23,
  },
  {
    id: "c2",
    postId: "1",
    author: {
      name: "SportsAnalyst",
      address: "0x9999aaaabbbbcccc",
    },
    content: "Great analysis! The tactical shifts in the third set were particularly interesting.",
    timestamp: "45m ago",
    likes: 15,
  },
];

export const leaderboardData = [
  {
    rank: 1,
    name: "SportsTruth",
    address: "0x1234567890abcdef",
    reputation: 2847,
    badges: 5,
    verified: 892,
  },
  {
    rank: 2,
    name: "FashionForward",
    address: "0xabcdef1234567890",
    reputation: 2634,
    badges: 4,
    verified: 765,
  },
  {
    rank: 3,
    name: "EntertainmentInsider",
    address: "0x9876543210fedcba",
    reputation: 2389,
    badges: 6,
    verified: 721,
  },
  {
    rank: 4,
    name: "TechVision",
    address: "0x1111222233334444",
    reputation: 2156,
    badges: 3,
    verified: 634,
  },
  {
    rank: 5,
    name: "WellnessWise",
    address: "0xfedcba0987654321",
    reputation: 1923,
    badges: 4,
    verified: 589,
  },
];
