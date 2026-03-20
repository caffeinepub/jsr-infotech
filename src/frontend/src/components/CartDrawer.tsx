import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    total,
    clearCart,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
            <p className="text-muted-foreground text-center">
              Your cart is empty.
              <br />
              Start shopping for laptops!
            </p>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              <Button
                className="bg-primary text-primary-foreground"
                data-ocid="cart.primary_button"
              >
                Browse Laptops
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item, i) => (
                <div
                  key={String(item.productId)}
                  className="flex gap-3"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <img
                    src={
                      item.imageUrl ||
                      "/assets/generated/laptop-dell-business.dim_400x300.jpg"
                    }
                    alt={item.name}
                    className="w-20 h-16 object-cover rounded-md border border-border"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      {item.brand}
                    </p>
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        data-ocid={`cart.button.${i + 1}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        data-ocid={`cart.button.${i + 1}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/80"
                    onClick={() => removeItem(item.productId)}
                    data-ocid={`cart.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-destructive text-destructive hover:bg-destructive/5"
                  onClick={clearCart}
                  data-ocid="cart.delete_button"
                >
                  Clear Cart
                </Button>
                <Link
                  to="/book"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    data-ocid="cart.primary_button"
                  >
                    Book / Enquire
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
