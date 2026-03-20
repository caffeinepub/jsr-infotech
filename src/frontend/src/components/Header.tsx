import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  Laptop,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Gaming", to: "/products?category=gaming" },
  { label: "Business", to: "/products?category=business" },
  { label: "Deals", to: "/products" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export function Header() {
  const { count, setIsOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/products", search: { q: searchQuery } });
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Tier 1: Utility Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="header.link"
          >
            <div className="bg-primary rounded-lg p-1.5">
              <Laptop className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-xl text-foreground tracking-tight">
                JSR
              </span>
              <span className="font-bold text-xl text-primary tracking-tight">
                {" "}
                Infotech
              </span>
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl hidden sm:flex"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="header.search_input"
                className="pl-9 rounded-full border-border bg-muted"
                placeholder="Search laptops by brand, model, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              data-ocid="header.link"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              data-ocid="header.link"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(true)}
              data-ocid="header.button"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  {count}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden"
                  data-ocid="header.button"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-8">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                      data-ocid="header.link"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/book" className="mt-4">
                    <Button
                      className="w-full bg-primary text-primary-foreground"
                      data-ocid="header.primary_button"
                    >
                      Book a Demo
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Tier 2: Nav Strip */}
      <nav className="bg-nav hidden sm:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="block px-4 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  data-ocid="header.link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link to="/book">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 my-1.5"
                  data-ocid="header.primary_button"
                >
                  Book a Demo
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
