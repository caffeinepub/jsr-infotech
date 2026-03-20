import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAllProducts } from "@/hooks/useQueries";
import { Search, SlidersHorizontal, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type Product, ProductCategory } from "../backend";

const STATIC_PRODUCTS: Product[] = [
  {
    id: BigInt(11),
    name: "HP ProBook 745 G6",
    brand: "HP",
    category: ProductCategory.business,
    price: BigInt(21000),
    description:
      "HP ProBook 745 G6 — AMD Ryzen 5 PRO, 8GB DDR4, NVMe 256GB, 2GB Graphics. Compact business laptop with 6-month warranty.",
    imageUrl: "/assets/generated/hp-745g6.dim_800x600.jpg",
    specs: {
      processor: "AMD Ryzen 5 PRO",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '14" FHD',
    },
    featured: true,
    stockQuantity: BigInt(10),
  },
  {
    id: BigInt(12),
    name: "HP EliteBook 840 G8",
    brand: "HP",
    category: ProductCategory.business,
    price: BigInt(30000),
    description:
      "HP EliteBook 840 G8 — Intel Core i5 11th Gen, 8GB DDR4, NVMe 256GB. Premium business laptop with 6-month warranty.",
    imageUrl: "/assets/generated/hp-840g8.dim_800x600.jpg",
    specs: {
      processor: "Core i5 11th Gen",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '14" FHD',
    },
    featured: true,
    stockQuantity: BigInt(10),
  },
  {
    id: BigInt(9),
    name: "Dell Latitude 5420",
    brand: "Dell",
    category: ProductCategory.business,
    price: BigInt(28000),
    description:
      'Dell Latitude 5420 — Intel Core i5 11th Gen, 8GB DDR4, NVMe 256GB. Compact 14" business laptop with 6-month warranty.',
    imageUrl: "/assets/generated/dell-5420.dim_600x400.jpg",
    specs: {
      processor: "Core i5 11th Gen",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '14" FHD',
    },
    featured: true,
    stockQuantity: BigInt(10),
  },
  {
    id: BigInt(10),
    name: "Dell Latitude 5410",
    brand: "Dell",
    category: ProductCategory.business,
    price: BigInt(26000),
    description:
      'Dell Latitude 5410 — Intel Core i5 10th Gen, 8GB DDR4, NVMe 256GB. Reliable 14" enterprise laptop with 6-month warranty.',
    imageUrl: "/assets/generated/dell-5410.dim_600x400.jpg",
    specs: {
      processor: "Core i5 10th Gen",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '14" FHD',
    },
    featured: true,
    stockQuantity: BigInt(10),
  },
  {
    id: BigInt(1),
    name: "Dell Latitude 5540 Business Laptop",
    brand: "Dell",
    category: ProductCategory.business,
    price: BigInt(75000),
    description:
      'Professional 15.6" FHD laptop with Intel Core i5, perfect for enterprise use.',
    imageUrl: "/assets/generated/laptop-dell-business.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i5-1345U",
      ram: BigInt(16),
      storage: BigInt(512),
      display: '15.6" FHD',
    },
    featured: true,
    stockQuantity: BigInt(10),
  },
  {
    id: BigInt(2),
    name: "ASUS ROG Strix G15 Gaming Laptop",
    brand: "ASUS",
    category: ProductCategory.gaming,
    price: BigInt(110000),
    description:
      "Powerful gaming laptop with RTX 4060, 165Hz display for top performance.",
    imageUrl: "/assets/generated/laptop-asus-gaming.dim_400x300.jpg",
    specs: {
      processor: "AMD Ryzen 7 7745HX",
      ram: BigInt(16),
      storage: BigInt(1024),
      display: '15.6" 165Hz',
    },
    featured: true,
    stockQuantity: BigInt(5),
  },
  {
    id: BigInt(3),
    name: "HP 15s Student Laptop",
    brand: "HP",
    category: ProductCategory.student,
    price: BigInt(42000),
    description:
      "Lightweight and affordable laptop ideal for students and everyday computing.",
    imageUrl: "/assets/generated/laptop-hp-student.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i3-1215U",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '15.6" HD',
    },
    featured: false,
    stockQuantity: BigInt(15),
  },
  {
    id: BigInt(4),
    name: "Lenovo ThinkPad T14 Gen 3",
    brand: "Lenovo",
    category: ProductCategory.business,
    price: BigInt(92000),
    description:
      "Military-grade durable business laptop with exceptional keyboard and security.",
    imageUrl: "/assets/generated/laptop-lenovo-business.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i7-1260P",
      ram: BigInt(16),
      storage: BigInt(512),
      display: '14" 2.2K',
    },
    featured: true,
    stockQuantity: BigInt(8),
  },
  {
    id: BigInt(5),
    name: "Acer Nitro 5 Gaming Laptop",
    brand: "Acer",
    category: ProductCategory.gaming,
    price: BigInt(68000),
    description:
      "Entry-level gaming powerhouse with RTX 3050, great for budget gamers.",
    imageUrl: "/assets/generated/laptop-asus-gaming.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i5-12500H",
      ram: BigInt(8),
      storage: BigInt(512),
      display: '15.6" 144Hz',
    },
    featured: false,
    stockQuantity: BigInt(12),
  },
  {
    id: BigInt(6),
    name: "HP EliteBook 840 G9",
    brand: "HP",
    category: ProductCategory.business,
    price: BigInt(115000),
    description:
      "Premium enterprise laptop with vPro security and all-day battery life.",
    imageUrl: "/assets/generated/laptop-dell-business.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i7-1265U",
      ram: BigInt(32),
      storage: BigInt(1024),
      display: '14" IPS',
    },
    featured: false,
    stockQuantity: BigInt(6),
  },
  {
    id: BigInt(7),
    name: "Lenovo IdeaPad Slim 3",
    brand: "Lenovo",
    category: ProductCategory.student,
    price: BigInt(35000),
    description:
      "Slim, lightweight student laptop with great battery life for college.",
    imageUrl: "/assets/generated/laptop-hp-student.dim_400x300.jpg",
    specs: {
      processor: "AMD Ryzen 5 5500U",
      ram: BigInt(8),
      storage: BigInt(256),
      display: '15.6" FHD',
    },
    featured: false,
    stockQuantity: BigInt(20),
  },
  {
    id: BigInt(8),
    name: "Dell Inspiron 15 3000",
    brand: "Dell",
    category: ProductCategory.general,
    price: BigInt(50000),
    description:
      "Versatile everyday laptop with great performance for home and office.",
    imageUrl: "/assets/generated/laptop-dell-business.dim_400x300.jpg",
    specs: {
      processor: "Intel Core i5-1135G7",
      ram: BigInt(8),
      storage: BigInt(512),
      display: '15.6" FHD',
    },
    featured: false,
    stockQuantity: BigInt(18),
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Gaming", value: ProductCategory.gaming },
  { label: "Business", value: ProductCategory.business },
  { label: "Student", value: ProductCategory.student },
  { label: "General", value: ProductCategory.general },
];

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: apiProducts, isLoading } = useAllProducts();
  const allProducts =
    apiProducts && apiProducts.length > 0 ? apiProducts : STATIC_PRODUCTS;

  const filtered = allProducts.filter((p) => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen py-10 px-4" data-ocid="products.page">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">
            Our Catalog
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Laptops
          </h1>
          <p className="text-muted-foreground">
            Find the perfect laptop for your needs &#8212; gaming, business, or
            studies.
          </p>
        </motion.div>

        {/* Customisation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 mb-8"
        >
          <Wrench className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Customisation Available
            </p>
            <p className="text-xs text-muted-foreground">
              Want more RAM or extra storage? We can upgrade any laptop to your
              requirement. Contact us or use the booking form for custom orders
              &#8212; additional charges apply.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="products.search_input"
              className="pl-9"
              placeholder="Search by brand or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <Tabs value={category} onValueChange={setCategory}>
              <TabsList className="flex flex-wrap h-auto gap-1">
                {CATEGORIES.map((c) => (
                  <TabsTrigger
                    key={c.value}
                    value={c.value}
                    className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    data-ocid="products.tab"
                  >
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="products.loading_state"
          >
            {SKELETON_KEYS.map((key) => (
              <div key={key}>
                <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="products.empty_state">
            <p className="text-muted-foreground text-lg">
              No laptops found matching your search.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-primary text-primary"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              data-ocid="products.secondary_button"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={String(p.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={p} index={i + 1} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
