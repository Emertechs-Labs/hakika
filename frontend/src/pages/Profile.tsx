import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Award, TrendingUp, Users, Settings } from "lucide-react";
import PostCard from "@/components/PostCard";
import { mockPosts, leaderboardData } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { address } = useParams();
  const { user } = useAuth();
  const isOwnProfile = user?.address === address;

  // Mock user data - in production, fetch from API
  const profileUser = leaderboardData.find((u) => u.address === address) || {
    name: "User",
    address: address || "",
    reputation: 0,
    badges: 0,
    verified: 0,
  };

  const userPosts = mockPosts.filter((p) => p.author.address === address);
  const followers = 1234;
  const following = 567;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="h-32 w-32 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-5xl">
                  {profileUser.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{profileUser.name}</h1>
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">
                      {profileUser.address.slice(0, 8)}...{profileUser.address.slice(-6)}
                    </p>
                  </div>

                  {isOwnProfile ? (
                    <Button variant="outline" asChild>
                      <Link to="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  ) : (
                    <Button>Follow</Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-bold">{profileUser.reputation}</div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{followers}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="badge-reward gap-1">
                    <Award className="h-3 w-3" />
                    Top Contributor
                  </Badge>
                  <Badge className="badge-verified gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {profileUser.verified} Verified Posts
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Rising Star
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">{profileUser.verified}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary">{profileUser.badges}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">
                {userPosts.reduce((sum, p) => sum + p.likes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No posts yet</p>
                  {isOwnProfile && (
                    <Button asChild className="mt-4">
                      <Link to="/create">Create Your First Post</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="followers" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{followers} followers</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{following} following</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
