import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { NICHES } from "@/data/mockData";

const communityData = NICHES.filter((n) => n !== "All").map((niche) => ({
  name: niche,
  members: Math.floor(Math.random() * 10000) + 1000,
  posts: Math.floor(Math.random() * 5000) + 500,
  verified: Math.floor(Math.random() * 1000) + 100,
  trending: Math.random() > 0.5,
  description: `Discover and share the latest ${niche.toLowerCase()} news, stories, and insights.`,
}));

export default function Communities() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Niche Communities</h1>
          <p className="text-muted-foreground">
            Explore specialized communities for sports, fashion, entertainment, and more
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityData.map((community) => (
            <Card key={community.name} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{community.name}</CardTitle>
                  {community.trending && (
                    <Badge className="badge-reward gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{community.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Members
                    </span>
                    <span className="font-medium">{community.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Posts</span>
                    <span className="font-medium">{community.posts.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Verified
                    </span>
                    <span className="font-medium">{community.verified.toLocaleString()}</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/feed">Explore Community</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
