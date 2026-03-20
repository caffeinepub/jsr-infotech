import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  HeadphonesIcon,
  Laptop,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend";
import { ProductCategory } from "../backend";

const STATIC_PRODUCTS: Product[] = [
  {
    id: BigInt(9),
    name: "Dell Latitude 5420",
    brand: "Dell",
    category: ProductCategory.business,
    price: BigInt(28000),
    description:
      'Dell Latitude 5420 with Intel Core i5 11th Gen, 8GB DDR4, NVMe 256GB. Compact 14" business laptop with 6-month warranty.',
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
      'Dell Latitude 5410 with Intel Core i5 10th Gen, 8GB DDR4, NVMe 256GB. Reliable 14" enterprise laptop with 6-month warranty.',
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
];

const steps = [
  {
    num: "01",
    title: "Browse Our Catalog",
    desc: "Explore our wide range of laptops \u2014 gaming, business, and student models from top brands.",
  },
  {
    num: "02",
    title: "Book a Demo",
    desc: "Schedule a product demo at our Patparganj office or get a consultation over WhatsApp.",
  },
  {
    num: "03",
    title: "Get It Delivered",
    desc: "After purchase, enjoy fast delivery across Delhi NCR or pick up from our office.",
  },
];

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Genuine Products",
    desc: "100% authentic laptops with manufacturer warranty",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Delhi NCR Delivery",
    desc: "Same-day delivery available across Delhi NCR",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "After-Sales Support",
    desc: "Dedicated support team for all technical queries",
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Demo Available",
    desc: "Try before you buy at our Patparganj office",
  },
];

export function HomePage() {
  const { data: apiProducts, isLoading } = useAllProducts();
  const products = (
    apiProducts && apiProducts.length > 0 ? apiProducts : STATIC_PRODUCTS
  ).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[560px] flex items-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-laptops.dim_1600x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-nav/95 via-nav/70 to-nav/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              Delhi's Trusted Laptop Company
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Your Trusted
              <br />
              <span className="text-primary">Laptop Partner</span>
              <br />
              in Delhi
            </h1>
            <p className="text-white/80 text-base lg:text-lg mb-8 leading-relaxed">
              JSR Infotech \u2014 Delhi's premier laptop company at Patparganj
              Industrial Area. Premium laptops for gaming, business, and
              education with expert demos and fast delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  data-ocid="hero.primary_button"
                >
                  SHOP ALL LAPTOPS <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/book">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  data-ocid="hero.secondary_button"
                >
                  <MessageCircle className="mr-2 w-4 h-4" /> Book a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="text-primary shrink-0">{f.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {f.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-4" data-ocid="products.section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Our Collection
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Featured Laptops
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hand-picked selection of the best laptops for every need and
              budget
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="products.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <motion.div
                  key={String(p.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard product={p} index={i + 1} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/5"
                data-ocid="products.primary_button"
              >
                View All Laptops <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 px-4 bg-card" data-ocid="howit.section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-primary/20" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 bg-primary/5 flex items-center justify-center mb-4 relative z-10">
                  <span className="text-3xl font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/book">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="howit.primary_button"
              >
                Book a Demo Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-14 px-4" id="about" data-ocid="about.section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                About JSR Infotech
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Delhi's Premier
                <br />
                Laptop Company
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                JSR Infotech is a leading technology company based in the Delhi
                Industrial Area, Patparganj. We specialize in providing
                high-quality laptops for businesses, gaming enthusiasts, and
                students across Delhi NCR.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With our extensive product range, expert technical team, and
                commitment to customer satisfaction, we ensure you get the best
                laptop for your specific needs at the most competitive prices.
              </p>
              <ul className="space-y-3">
                {[
                  "Authorized dealer for all major brands",
                  "Dedicated after-sales support team",
                  "GST invoice provided for all purchases",
                  "EMI options available",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Happy Clients", value: "500+" },
                  { label: "Products", value: "200+" },
                  { label: "Brands", value: "15+" },
                  { label: "Years Experience", value: "10+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-muted"
                  >
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-star text-star" />
                  ))}
                  <span className="text-sm font-semibold">4.8/5</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on 120+ customer reviews
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section
        className="py-14 px-4 bg-card"
        id="contact"
        data-ocid="location.section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Visit Us
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              Find Us in Patparganj
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Map embed */}
            <div className="rounded-xl overflow-hidden border border-border shadow-card min-h-[300px] bg-muted flex items-center justify-center">
              <iframe
                title="JSR Infotech Location"
                src="https://maps.google.com/maps?q=Patparganj+Industrial+Area+Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="340"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact card */}
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                <h3 className="font-bold text-lg text-foreground mb-4">
                  JSR Infotech
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-muted-foreground text-sm">
                        Second Floor, Plot No. 142,
                        <br />
                        Delhi Industrial Area,
                        <br />
                        Patparganj, Delhi &#8211; 110092
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Phone / WhatsApp</p>
                      <a
                        href="tel:+919876385904"
                        className="text-muted-foreground text-sm hover:text-primary"
                      >
                        +91 98763 85904
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">GST Number</p>
                      <p className="text-muted-foreground text-sm font-mono">
                        07AAPFJ4323E1ZG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/919876385904?text=Hello%2C%20I%20am%20interested%20in%20your%20laptops%20at%20JSR%20Infotech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#22c35e] text-white gap-2 py-6"
                  data-ocid="location.primary_button"
                >
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </Button>
              </a>
              <Link to="/book">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 py-5"
                  data-ocid="location.secondary_button"
                >
                  Book a Demo / Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
