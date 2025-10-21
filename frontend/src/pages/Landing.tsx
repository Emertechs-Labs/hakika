import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import { mockPosts } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import heroNetwork from "@/assets/hero-network.jpg";
import heroOverlay from "@/assets/hero-overlay.png";

export default function Landing() {
  const { user, connectWallet, isConnecting } = useAuth();
  
  const featuredPosts = mockPosts.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroNetwork})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>

        {/* Animated Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroOverlay})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Animated Badge */}
            <Badge className="mb-6 badge-verified text-sm py-2 px-4 animate-slide-up shadow-glow">
              <Shield className="h-4 w-4 mr-2" />
              Powered by Decentralized Verification
            </Badge>
            
            {/* Main Heading with Staggered Animation */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Authentic Media,
              <br />
              <span className="text-secondary inline-flex items-center gap-3 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                Decentralized Truth
                <Sparkles className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join the revolution in journalism. Create, verify, and share content across sports,
              fashion, entertainment, and lifestyle—powered by AI and blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {user ? (
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform" asChild>
                  <Link to="/feed">Explore Feed</Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet to Start"}
                </Button>
              )}
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm" asChild>
                <Link to="/communities">Browse Communities</Link>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/80 text-sm md:text-base">Verified Articles</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">5K+</div>
                <div className="text-white/80 text-sm md:text-base">Active Writers</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">98%</div>
                <div className="text-white/80 text-sm md:text-base">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hakika?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Revolutionary features that put truth and transparency first
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Agent Verification</h3>
                <p className="text-muted-foreground">
                  AI-powered fact-checking through ASI:One and Agentverse ensures every piece of
                  content meets the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gamified Rewards</h3>
                <p className="text-muted-foreground">
                  Earn reputation and badges by contributing quality content and participating in
                  community verification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-success transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Decentralized Trust</h3>
                <p className="text-muted-foreground">
                  Blockchain-based reputation system ensures transparency and prevents manipulation
                  of content credibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Assisted Creation</h3>
                <p className="text-muted-foreground">
                  Get intelligent suggestions and improvements for your content powered by advanced
                  language models.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Niche Communities</h3>
                <p className="text-muted-foreground">
                  Join specialized communities for sports, fashion, entertainment, and more—each
                  with dedicated moderators.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-success transition-colors">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Discovery</h3>
                <p className="text-muted-foreground">
                  Stay updated with trending topics, emerging stories, and breaking news from
                  trusted sources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Verified Stories</h2>
            <p className="text-muted-foreground text-lg">
              Discover the most popular verified content from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden card-hover">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.niche}
                    </Badge>
                    {post.verified && (
                      <Badge className="badge-verified text-xs gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link to={`/post/${post.id}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/feed">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Future of Media?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect your wallet and start creating, verifying, and earning today.
          </p>
          {user ? (
            <Button variant="secondary" size="lg" asChild>
              <Link to="/create">Create Your First Post</Link>
            </Button>
          ) : (
            <Button variant="secondary" size="lg" onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Get Started Now"}
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="font-bold text-xl gradient-text">Hakika</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Decentralized media platform for authentic journalism and community-driven
                verification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/feed" className="hover:text-primary transition-colors">
                    Feed
                  </Link>
                </li>
                <li>
                  <Link to="/communities" className="hover:text-primary transition-colors">
                    Communities
                  </Link>
                </li>
                <li>
                  <Link to="/verification" className="hover:text-primary transition-colors">
                    Verification
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
            <p>© 2024 Hakika. All rights reserved. Built on decentralized principles.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
