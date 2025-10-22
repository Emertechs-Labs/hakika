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
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-bold text-xl text-blue-600">Hakika</span>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#hero" className="text-sm font-medium">Home</a>
          <a href="#features" className="text-sm font-medium">Features</a>
          <a href="#how-it-works" className="text-sm font-medium">How It Works</a>
        </nav>
      </div>
    </header>
  );
}
