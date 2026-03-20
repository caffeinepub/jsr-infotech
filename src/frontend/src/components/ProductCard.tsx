import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../backend";

const categoryLabels: Record<string, string> = {
  gaming: "Gaming",
  business: "Business",
  student: "Student",
  general: "General",
};

const categoryColors: Record<string, string> = {
  gaming: "bg-red-100 text-red-700",
  business: "bg-blue-100 text-blue-700",
  student: "bg-green-100 text-green-700",
  general: "bg-gray-100 text-gray-700",
};

// Products that carry a warranty badge (keyed by exact product name)
const WARRANTY_MONTHS: Record<string, number> = {
  "Dell Latitude 5420": 6,
  "Dell Latitude 5410": 6,
  "HP ProBook 745 G6": 6,
  "HP EliteBook 840 G8": 6,
};

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const priceInRupees = Number(product.price);
  const warrantyMonths = WARRANTY_MONTHS[product.name];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div
      className="bg-card rounded-lg border border-border shadow-card overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
      data-ocid={`products.item.${index}`}
    >
      <div className="relative overflow-hidden bg-muted aspect-[4/3]">
        <img
          src={
            product.imageUrl ||
            "/assets/generated/laptop-dell-business.dim_400x300.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
            categoryColors[product.category] || categoryColors.general
          }`}
        >
          {categoryLabels[product.category] || product.category}
        </span>
        {product.featured && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            Featured
          </span>
        )}
        {warrantyMonths && (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 bg-emerald-600/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            <ShieldCheck className="w-3 h-3" />
            {warrantyMonths} Months Warranty
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground font-medium mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Specs pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {product.specs.processor}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {Number(product.specs.ram)}GB DDR4
          </Badge>
          <Badge variant="outline" className="text-xs">
            NVMe {Number(product.specs.storage)}GB
          </Badge>
          {warrantyMonths && (
            <Badge className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
              <ShieldCheck className="w-3 h-3 mr-1" />
              {warrantyMonths}M Warranty
            </Badge>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${
                s <= 4
                  ? "fill-star text-star"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
        </div>

        <div className="mt-auto">
          <p className="text-lg font-bold text-foreground mb-3">
            &#8377;{priceInRupees.toLocaleString("en-IN")}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
              onClick={handleAddToCart}
              data-ocid={`products.button.${index}`}
            >
              <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
            </Button>
            <Link to="/book" className="flex-1">
              <Button
                size="sm"
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5 text-xs"
                data-ocid={`products.secondary_button.${index}`}
              >
                <CalendarCheck className="w-3 h-3 mr-1" /> Book Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
