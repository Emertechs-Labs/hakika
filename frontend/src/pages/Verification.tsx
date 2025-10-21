import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, Award, Trophy, Medal, Crown } from "lucide-react";
import { mockPosts, leaderboardData } from "@/data/mockData";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Verification() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [votesCount, setVotesCount] = useState(0);

  const unverifiedPosts = mockPosts.filter((p) => !p.verified);
  const currentPost = unverifiedPosts[currentPostIndex];

  const handleVote = (accurate: boolean) => {
    // Mock verification logic
    const correct = Math.random() > 0.3; // 70% chance of being correct
    const points = correct ? 10 : -5;
    
    setUserScore((prev) => prev + points);
    setVotesCount((prev) => prev + 1);
    
    toast.success(
      correct ? "Correct! +10 points" : "Incorrect. -5 points",
      {
        description: `You voted: ${accurate ? "Accurate" : "Inaccurate"}`,
      }
    );

    // Move to next post
    if (currentPostIndex < unverifiedPosts.length - 1) {
      setCurrentPostIndex((prev) => prev + 1);
    } else {
      setCurrentPostIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verification Game</h1>
          <p className="text-muted-foreground">
            Vote on content accuracy to earn reputation points and climb the leaderboard
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Verification Card */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Stats</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userScore}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{votesCount}</div>
                      <div className="text-xs text-muted-foreground">Votes</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress to next badge</span>
                  <span>{userScore}/100</span>
                </div>
                <Progress value={userScore % 100} className="h-2" />
              </CardContent>
            </Card>

            {currentPost ? (
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <Badge variant="outline" className="mb-4">
                    {currentPost.niche}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">{currentPost.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{currentPost.excerpt}</p>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Is this content accurate?</h3>
                    <div className="flex gap-4">
                      <Button
                        variant="success"
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={() => handleVote(true)}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        Accurate
                      </Button>
                      <Button
                        variant="destructive"
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={() => handleVote(false)}
                      >
                        <ThumbsDown className="h-5 w-5" />
                        Inaccurate
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Link
                      to={`/post/${currentPost.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View full post →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No more posts to verify at the moment!</p>
                  <Button asChild className="mt-4">
                    <Link to="/feed">Browse Feed</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Leaderboard Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.rank <= 3 ? "bg-gradient-card" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center h-8 w-8 rounded-full font-bold ${
                            user.rank === 1
                              ? "bg-secondary text-secondary-foreground"
                              : user.rank === 2
                              ? "bg-muted-foreground/20"
                              : user.rank === 3
                              ? "bg-muted-foreground/10"
                              : "bg-muted"
                          }`}
                        >
                          {user.rank === 1 && <Crown className="h-4 w-4" />}
                          {user.rank === 2 && <Medal className="h-4 w-4" />}
                          {user.rank === 3 && <Award className="h-4 w-4" />}
                          {user.rank > 3 && <span className="text-xs">{user.rank}</span>}
                        </div>
                        <div>
                          <Link
                            to={`/profile/${user.address}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {user.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">
                            {user.verified} verified
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {user.reputation}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Earn Badges
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rookie Verifier</span>
                    <Badge variant="outline" className="text-xs">0/10</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Accuracy Expert</span>
                    <Badge variant="outline" className="text-xs">0/50</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Truth Seeker</span>
                    <Badge variant="outline" className="text-xs">0/100</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1. Read the post carefully</p>
                <p>2. Vote on its accuracy</p>
                <p>3. Earn points for correct votes</p>
                <p>4. Climb the leaderboard</p>
                <p className="text-xs pt-2 border-t">
                  AI agents verify your votes to ensure fairness
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
