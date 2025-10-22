import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Users, Zap, TrendingUp, Award, CheckCircle, Wallet as WalletIcon } from "lucide-react";

export default function Landing() {
  const { user, connectWallet, isConnecting } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet('yoroi');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "AGI Verification",
      description: "Content verified by ASI:One, MeTTa, and autonomous agents for maximum accuracy"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Niche Communities",
      description: "Specialized spaces for sports, fashion, entertainment, and lifestyle content"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Real-Time Verification",
      description: "Instant fact-checking with AI-powered analysis and blockchain transparency"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Earn Rewards",
      description: "Get reputation tokens on Cardano for creating and verifying authentic content"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Connect Wallet",
      description: "Link your Cardano wallet (Nami, Eternl, or Yoroi) for decentralized authentication"
    },
    {
      step: "2",
      title: "Create Content",
      description: "Share your stories with AGI-assisted drafting for optimal accuracy"
    },
    {
      step: "3",
      title: "AI Verification",
      description: "Our AGI agents verify your content using advanced fact-checking algorithms"
    },
    {
      step: "4",
      title: "Earn Reputation",
      description: "Receive blockchain rewards and build your credibility in the community"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30" variant="outline">
              Powered by Fetch.ai AGI Technology
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Authentic Media, Decentralized Truth
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto">
              The decentralized social network where AI agents verify content authenticity, 
              and blockchain rewards truth. Join the revolution in media integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
              {user ? (
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform" asChild>
                  <Link to="/feed">Explore Feed</Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  <WalletIcon className="mr-2 h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect Wallet to Start"}
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-sm text-white/70">Verified Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5K+</div>
                <div className="text-sm text-white/70">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-white/70">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-spacing bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hakika?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI verification meets blockchain transparency for unparalleled media integrity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-2">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-spacing bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to authentic, verified content on the blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-glow">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section id="communities" className="section-spacing bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Communities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Niche Communities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join specialized communities for sports, fashion, entertainment, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["Sports", "Fashion", "Entertainment", "Lifestyle", "Technology", "Health"].map((community) => (
              <Card key={community} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{community}</CardTitle>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">{(Math.random() * 5000 + 1000).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Verified Posts</span>
                      <span className="font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-success" />
                        {(Math.random() * 500 + 100).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link to="/communities">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section id="verification" className="section-spacing bg-gradient-verified text-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30" variant="outline">
              Verification Game
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Earn While You Verify</h2>
            <p className="text-lg text-white/90 mb-8">
              Participate in the verification game, vote on content accuracy, and earn reputation tokens. 
              The more accurate your votes, the higher your rewards!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/verification">Start Verifying</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20">
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">About Hakika</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Building the Future of Media</h2>
              <p className="text-lg text-muted-foreground">
                Hakika combines cutting-edge AI technology with blockchain transparency to create 
                a social media platform where truth is rewarded and misinformation is eliminated.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  ASI:One and MeTTa agents verify every piece of content
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <WalletIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Blockchain Native</h3>
                <p className="text-sm text-muted-foreground">
                  Built on Cardano for transparent, immutable reputation
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Users participate in verification and governance
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Ready to join the revolution in media integrity?
              </p>
              {!user && (
                <Button size="lg" onClick={handleConnectWallet} disabled={isConnecting}>
                  <WalletIcon className="mr-2 h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect Wallet Now"}
                </Button>
              )}
              {user && (
                <Button size="lg" asChild>
                  <Link to="/feed">Go to Feed</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl gradient-text">Hakika</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Hakika. Powered by Fetch.ai and Cardano.
            </p>
            <div className="flex gap-4">
              <Link to="/communities" className="text-sm text-muted-foreground hover:text-primary">Communities</Link>
              <Link to="/verification" className="text-sm text-muted-foreground hover:text-primary">Verify</Link>
              <Link to="/feed" className="text-sm text-muted-foreground hover:text-primary">Feed</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
