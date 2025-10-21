import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import { mockPosts, NICHES } from "@/data/mockData";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState<"all" | "posts" | "users">("all");
  const [selectedNiche, setSelectedNiche] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const searchQuery = searchParams.get("q") || "";
  
  const filteredPosts = mockPosts.filter((post) => {
    const matchesQuery =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.niche.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesNiche = selectedNiche === "All" || post.niche === selectedNiche;

    return matchesQuery && matchesNiche;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts, users, topics..."
                className="pl-12 h-12 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>

          {searchQuery && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing results for <span className="font-medium text-foreground">"{searchQuery}"</span>
                </p>
              </div>

              <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
              </Tabs>

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

              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try different keywords or filters
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {!searchQuery && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Search Hakika</h2>
              <p className="text-muted-foreground">
                Find posts, users, and communities across all niches
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
