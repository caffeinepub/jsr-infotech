import { Link } from "@tanstack/react-router";
import { Laptop, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="bg-nav text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-lg p-1.5">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">JSR Infotech</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Your trusted laptop partner in Delhi. We provide premium laptops
              for gaming, business, and education.
            </p>
            <div className="flex items-center gap-3 text-white/60">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "All Laptops", to: "/products" },
                { label: "Gaming Laptops", to: "/products" },
                { label: "Business Laptops", to: "/products" },
                { label: "Student Laptops", to: "/products" },
                { label: "Book a Demo", to: "/book" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-white/70 hover:text-primary text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Laptop Sales</li>
              <li>Product Demo</li>
              <li>Repair &amp; Service</li>
              <li>Corporate Supply</li>
              <li>Technical Consultation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  Second Floor, Plot No. 142,
                  <br />
                  Delhi Industrial Area,
                  <br />
                  Patparganj, Delhi &#8211; 110092
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+919876385904"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  +91 98763 85904
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://wa.me/919876385904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white/70">info@jsrinfotech.in</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/50">GST No.</p>
              <p className="text-sm font-mono text-white/80 font-medium">
                07AAPFJ4323E1ZG
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <span>
            &copy; {year} JSR Infotech. All rights reserved. GST:
            07AAPFJ4323E1ZG
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Built with &#10084;&#65039; using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
