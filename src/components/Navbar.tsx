import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
            <Cloud className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Weather Odds
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Explorer</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/docs">Docs/Help</Link>
          </Button>
          <Button variant="default" asChild className="ml-2">
            <Link to="/">Dashboard</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" asChild>
            <Link to="/">Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
