import { useState } from "react";
import PostCard from "@/components/PostCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Award } from "lucide-react";
import { mockPosts, NICHES, leaderboardData } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Feed() {
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [sortBy, setSortBy] = useState<"recent" | "trending" | "verified">("recent");

  const filteredPosts = mockPosts.filter(
    (post) => selectedNiche === "All" || post.niche === selectedNiche
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Feed */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Your Feed</h1>
              <p className="text-muted-foreground">
                Discover verified content from the community
              </p>
            </div>

            {/* Niche Filters */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {NICHES.map((niche) => (
                  <Badge
                    key={niche}
                    variant={selectedNiche === niche ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 transition-colors px-4 py-2"
                    onClick={() => setSelectedNiche(niche)}
                  >
                    {niche}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)} className="mb-6">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="verified">Verified Only</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { tag: "#GrandSlamFinals", posts: "1.2K posts" },
                    { tag: "#SustainableFashion", posts: "890 posts" },
                    { tag: "#AIRevolution", posts: "756 posts" },
                    { tag: "#WellnessWeek", posts: "543 posts" },
                    { tag: "#BlockbusterSummer", posts: "421 posts" },
                  ].map((topic) => (
                    <li key={topic.tag}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-primary hover:underline cursor-pointer">
                          {topic.tag}
                        </span>
                        <span className="text-xs text-muted-foreground">{topic.posts}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggested Follows */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Suggested Follows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {leaderboardData.slice(0, 3).map((user) => (
                    <li key={user.address}>
                      <Link
                        to={`/profile/${user.address}`}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.reputation} reputation
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {leaderboardData.slice(0, 5).map((user) => (
                    <li key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                            user.rank === 1
                              ? "bg-secondary text-secondary-foreground"
                              : user.rank === 2
                              ? "bg-muted-foreground/20"
                              : "bg-muted"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <Link
                          to={`/profile/${user.address}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {user.name}
                        </Link>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.reputation}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/verification"
                  className="block mt-4 text-sm text-primary hover:underline text-center"
                >
                  View Full Leaderboard →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
