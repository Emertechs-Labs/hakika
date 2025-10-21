import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Wallet, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { user, isConnecting, connectWallet, disconnectWallet } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {location.pathname === "/" ? (
        // One-page navigation for landing page
        <>
          <button
            onClick={() => scrollToSection('hero')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('communities')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => scrollToSection('verification')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Verification
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              mobile ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            About
          </button>
        </>
      ) : (
        // Regular navigation for other pages
        <>
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/feed"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/feed" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Feed
          </Link>
          <Link
            to="/communities"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/communities" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Communities
          </Link>
          <Link
            to="/verification"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/verification" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Verification Game
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-bold text-xl gradient-text hidden sm:inline-block">Hakika</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          <NavLinks />
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <label htmlFor="search-input" className="sr-only">Search posts, users, niches</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="search-input"
              type="search"
              placeholder="Search posts, users, niches..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("blue")}>
                Blue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("green")}>
                Green
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("purple")}>
                Purple
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Connect / User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {user.address.slice(0, 6)}...{user.address.slice(-4)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${user.address}`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create" className="cursor-pointer">
                    Create Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={connectWallet}
              disabled={isConnecting}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                <NavLinks mobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
