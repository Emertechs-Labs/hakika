import { Heart, MessageCircle, Share2, CheckCircle, Award, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    address: string;
    verified: boolean;
  };
  niche: string;
  verified: boolean;
  upvotes: number;
  downvotes: number;
  comments: number;
  timestamp: string;
  image?: string;
}

export default function PostCard({
  id,
  title,
  excerpt,
  author,
  niche,
  verified,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  comments,
  timestamp,
  image,
}: PostCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const handleVote = async (vote: 'up' | 'down') => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${id}/vote`, { vote });
      setUpvotes(response.data.upvotes);
      setDownvotes(response.data.downvotes);
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="card-hover"
    >
      <Card className="overflow-hidden">
        {image && (
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {niche}
          </Badge>
          {verified && (
            <Badge className="badge-verified text-xs gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        <Link to={`/post/${id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${author.address}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{author.name}</span>
                {author.verified && <CheckCircle className="h-3 w-3 text-success" />}
              </div>
            </Link>
          </div>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('up')}
            className="gap-2 min-h-[44px] px-3" // Touch-friendly
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">{upvotes}</span> {/* Hide count on small screens */}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('down')}
            className="gap-2 min-h-[44px] px-3"
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="hidden sm:inline">{downvotes}</span>
          </Button>

          <Button variant="ghost" size="sm" asChild className="gap-2 min-h-[44px] px-3">
            <Link to={`/post/${id}`}>
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{comments}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" className="gap-2 ml-auto min-h-[44px] px-3">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
