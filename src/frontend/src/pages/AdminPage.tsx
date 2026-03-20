import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAddProduct,
  useAllProducts,
  useIsAdmin,
  useRemoveProduct,
} from "@/hooks/useQueries";
import {
  Loader2,
  Lock,
  Package,
  PlusCircle,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory, ServiceType } from "../backend";
import type { ProductInput } from "../backend";

export function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: products, isLoading: loadingProducts } = useAllProducts();
  const addProduct = useAddProduct();
  const removeProduct = useRemoveProduct();

  const [newProduct, setNewProduct] = useState<Partial<ProductInput>>({
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    price: BigInt(0),
    category: ProductCategory.general,
    featured: false,
    stockQuantity: BigInt(1),
    specs: { processor: "", ram: BigInt(8), storage: BigInt(256), display: "" },
  });

  if (!identity) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-20 px-4"
        data-ocid="admin.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border shadow-card max-w-sm w-full p-8 text-center"
          data-ocid="admin.modal"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Admin Access
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Login with Internet Identity to access the admin panel.
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" /> Login with Internet Identity
              </>
            )}
          </Button>
        </motion.div>
      </main>
    );
  }

  if (checkingAdmin) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-20 px-4"
        data-ocid="admin.error_state"
      >
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You don't have admin privileges.
          </p>
        </div>
      </main>
    );
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.price) {
      toast.error("Please fill in required fields.");
      return;
    }
    try {
      await addProduct.mutateAsync(newProduct as ProductInput);
      toast.success("Product added successfully!");
      setNewProduct({
        name: "",
        brand: "",
        description: "",
        imageUrl: "",
        price: BigInt(0),
        category: ProductCategory.general,
        featured: false,
        stockQuantity: BigInt(1),
        specs: {
          processor: "",
          ram: BigInt(8),
          storage: BigInt(256),
          display: "",
        },
      });
    } catch {
      toast.error("Failed to add product.");
    }
  };

  const handleRemove = async (id: bigint) => {
    try {
      await removeProduct.mutateAsync(id);
      toast.success("Product removed.");
    } catch {
      toast.error("Failed to remove product.");
    }
  };

  return (
    <main className="min-h-screen py-10 px-4" data-ocid="admin.page">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">
            JSR Infotech — Product & Booking Management
          </p>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger
              value="products"
              className="gap-2"
              data-ocid="admin.tab"
            >
              <Package className="w-4 h-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2" data-ocid="admin.tab">
              <PlusCircle className="w-4 h-4" /> Add Product
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="gap-2"
              data-ocid="admin.tab"
            >
              <Users className="w-4 h-4" /> Bookings
            </TabsTrigger>
          </TabsList>

          {/* Products List */}
          <TabsContent value="products" data-ocid="admin.panel">
            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              {loadingProducts ? (
                <div
                  className="p-8 text-center"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                </div>
              ) : (
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(products || []).map((p, i) => (
                      <TableRow
                        key={String(p.id)}
                        data-ocid={`admin.row.${i + 1}`}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.brand}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {p.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{Number(p.price).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell>{String(p.stockQuantity)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/80"
                            onClick={() => handleRemove(p.id)}
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!products || products.length === 0) && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="admin.empty_state"
                        >
                          No products yet. Add your first product.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Add Product */}
          <TabsContent value="add" data-ocid="admin.panel">
            <div className="bg-card rounded-xl border border-border shadow-card p-6 max-w-2xl">
              <h3 className="font-semibold text-lg mb-5">Add New Product</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm">Product Name *</Label>
                  <Input
                    data-ocid="admin.input"
                    value={newProduct.name || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Dell Latitude 5540"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Brand *</Label>
                  <Input
                    data-ocid="admin.input"
                    value={newProduct.brand || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({ ...p, brand: e.target.value }))
                    }
                    placeholder="Dell"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Price (₹) *</Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={Number(newProduct.price) || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        price: BigInt(e.target.value || 0),
                      }))
                    }
                    placeholder="75000"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(v) =>
                      setNewProduct((p) => ({
                        ...p,
                        category: v as ProductCategory,
                      }))
                    }
                  >
                    <SelectTrigger data-ocid="admin.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ProductCategory.gaming}>
                        Gaming
                      </SelectItem>
                      <SelectItem value={ProductCategory.business}>
                        Business
                      </SelectItem>
                      <SelectItem value={ProductCategory.student}>
                        Student
                      </SelectItem>
                      <SelectItem value={ProductCategory.general}>
                        General
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Processor</Label>
                  <Input
                    data-ocid="admin.input"
                    value={newProduct.specs?.processor || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        specs: { ...p.specs!, processor: e.target.value },
                      }))
                    }
                    placeholder="Intel Core i5-1345U"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Display</Label>
                  <Input
                    data-ocid="admin.input"
                    value={newProduct.specs?.display || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        specs: { ...p.specs!, display: e.target.value },
                      }))
                    }
                    placeholder='15.6" FHD'
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">RAM (GB)</Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={Number(newProduct.specs?.ram) || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        specs: {
                          ...p.specs!,
                          ram: BigInt(e.target.value || 8),
                        },
                      }))
                    }
                    placeholder="16"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Storage (GB)</Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={Number(newProduct.specs?.storage) || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        specs: {
                          ...p.specs!,
                          storage: BigInt(e.target.value || 256),
                        },
                      }))
                    }
                    placeholder="512"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label className="text-sm">Image URL</Label>
                  <Input
                    data-ocid="admin.input"
                    value={newProduct.imageUrl || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label className="text-sm">Description</Label>
                  <Textarea
                    data-ocid="admin.textarea"
                    value={newProduct.description || ""}
                    onChange={(e) =>
                      setNewProduct((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>
              </div>
              <Button
                className="mt-5 bg-primary text-primary-foreground gap-2"
                onClick={handleAddProduct}
                disabled={addProduct.isPending}
                data-ocid="admin.submit_button"
              >
                {addProduct.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
                Add Product
              </Button>
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" data-ocid="admin.panel">
            <div
              className="bg-card rounded-xl border border-border shadow-card p-8 text-center"
              data-ocid="admin.empty_state"
            >
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Bookings management coming soon.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Current bookings are handled via WhatsApp at +91 98763 85904
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
