import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, CheckCircle, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockPosts, mockComments } from "@/data/mockData";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id);
  const comments = mockComments.filter((c) => c.postId === id);

  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
          <Button asChild>
            <Link to="/feed">Back to Feed</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/feed">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Link>
        </Button>

        <article className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{post.niche}</Badge>
            {post.verified && (
              <Badge className="badge-verified gap-1">
                <CheckCircle className="h-3 w-3" />
                Agent Verified
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <Link
              to={`/profile/${post.author.address}`}
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author.name}</span>
                  {post.author.verified && <CheckCircle className="h-4 w-4 text-success" />}
                </div>
                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
              </div>
            </Link>
          </div>

          {post.image && (
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            <p className="leading-relaxed">
              {post.content ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`}
            </p>
          </div>

          <div className="flex items-center gap-4 py-6 border-y">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={handleLike}
              className="gap-2"
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              <span>{likes}</span>
            </Button>

            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length}</span>
            </Button>

            <Button variant="outline" className="gap-2">
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Verification Voting */}
          {post.verified && (
            <Card className="mt-6 border-success/20 bg-success/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Community Verification
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This content has been verified by AI agents and the community. Vote on its
                  accuracy to earn reputation points.
                </p>
                <div className="flex gap-2">
                  <Button variant="success" size="sm" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Accurate (892)
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Inaccurate (23)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </article>

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

          <Card className="mb-6">
            <CardContent className="p-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 min-h-[100px]"
              />
              <Button onClick={handleComment}>Post Comment</Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">
                        {comment.author.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          to={`/profile/${comment.author.address}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {comment.author.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground mb-3">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Heart className="h-3 w-3" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
