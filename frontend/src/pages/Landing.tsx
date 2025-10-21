import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

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
      await connectWallet('yoroi'); // Default to Yoroi wallet
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:inline-block">Hakika</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              Home
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            {user ? (
              <Button variant="default" size="sm" asChild>
                <Link to="/feed">Go to Feed</Link>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleConnectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Authentic Media, Decentralized Truth
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 animate-slide-up px-4">
              {user ? (
                <Button variant="secondary" size="lg" className="text-lg px-6 md:px-8 py-4 md:py-6 shadow-glow hover:scale-105 transition-transform" asChild>
                  <Link to="/feed">Explore Feed</Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-6 md:px-8 py-4 md:py-6 shadow-glow hover:scale-105 transition-transform"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet to Start"}
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-6 md:px-8 py-4 md:py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Why Choose Hakika?</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
