import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, Eye, Send } from "lucide-react";
import { NICHES } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import axios from "axios";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [niche, setNiche] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  const [preview, setPreview] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please connect your wallet to create posts.
            </p>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAiAssist = async () => {
    setIsAiAssisting(true);
    // Mock API call to ASI:One
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const suggestions = [
      "Consider adding more specific details about the main points",
      "The introduction could be more engaging with a compelling hook",
      "Include relevant statistics or data to support your claims",
    ];
    
    toast.success("AI Suggestions Generated", {
      description: suggestions[0],
    });
    
    setIsAiAssisting(false);
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!title || !content || !niche) {
      toast.error("Missing Fields", {
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      const postData = {
        title,
        content,
        niche,
        tags,
        author: user.walletAddress,
      };

      await axios.post('/api/posts', postData);

      toast.success("Post Created!", {
        description: "Your post has been submitted for verification",
      });
      
      navigate("/feed");
    } catch (error) {
      toast.error("Failed to create post", {
        description: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
          <p className="text-muted-foreground">
            Share your story with the Hakika community. All posts are verified by AI agents.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a compelling title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="niche">Niche *</Label>
                  <Select value={niche} onValueChange={setNiche}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {NICHES.filter((n) => n !== "All").map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your article here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-2 min-h-[300px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {content.length} characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="media">Featured Image (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => setPreview(!preview)} variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                {preview ? "Edit" : "Preview"}
              </Button>
              <Button onClick={handleSubmit} className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Publish Post
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get intelligent suggestions to improve your content using ASI:One.
                </p>
                <Button
                  onClick={handleAiAssist}
                  disabled={isAiAssisting || !content}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isAiAssisting ? "Analyzing..." : "Get AI Suggestions"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Publishing Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <span className="text-success">✓</span>
                  <span>Original, fact-checked content</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-success">✓</span>
                  <span>Clear, engaging writing</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-success">✓</span>
                  <span>Proper attribution of sources</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Plagiarized or misleading content</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Spam or promotional material</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 text-sm">Earn Reputation</h4>
                <p className="text-xs text-muted-foreground">
                  Quality posts that pass verification earn you reputation points and badges!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        {preview && (
          <div className="fixed inset-0 bg-background/95 z-50 overflow-auto p-4">
            <div className="container max-w-4xl py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Preview</h2>
                <Button onClick={() => setPreview(false)} variant="outline">
                  Close Preview
                </Button>
              </div>
              <Card>
                <CardContent className="p-8">
                  {niche && <Badge className="mb-4">{niche}</Badge>}
                  <h1 className="text-4xl font-bold mb-6">{title || "Untitled Post"}</h1>
                  <div className="prose prose-lg max-w-none">
                    <p className="whitespace-pre-wrap">{content || "No content yet..."}</p>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
