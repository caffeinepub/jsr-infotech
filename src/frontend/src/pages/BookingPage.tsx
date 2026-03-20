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
import { Textarea } from "@/components/ui/textarea";
import { useCreateBooking } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Laptop,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceType } from "../backend";

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  laptopInterest: string;
  serviceType: ServiceType;
  date: string;
  timeSlot: string;
  notes: string;
}

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

export function BookingPage() {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    email: "",
    laptopInterest: "",
    serviceType: ServiceType.demo,
    date: "",
    timeSlot: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const createBooking = useCreateBooking();

  const handleChange = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const serviceLabels: Record<ServiceType, string> = {
    [ServiceType.demo]: "Product Demo",
    [ServiceType.repair]: "Repair Service",
    [ServiceType.consultation]: "Purchase Consultation",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.timeSlot) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createBooking.mutateAsync({
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        serviceType: form.serviceType,
        preferredDate:
          BigInt(new Date(form.date).getTime()) * BigInt(1_000_000),
        preferredTimeSlot: form.timeSlot,
        notes: `Laptop Interest: ${form.laptopInterest}\n${form.notes}`,
      });
    } catch {
      // Booking might fail if not authenticated, still proceed with WhatsApp
    }

    const message = [
      "🖥️ *New Booking Request — JSR Infotech Website*",
      "",
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email || "N/A"}`,
      `*Laptop Interest:* ${form.laptopInterest || "N/A"}`,
      `*Service Type:* ${serviceLabels[form.serviceType]}`,
      `*Preferred Date:* ${form.date}`,
      `*Time Slot:* ${form.timeSlot}`,
      `*Notes:* ${form.notes || "None"}`,
      "",
      "_Sent from JSR Infotech Website_",
    ].join("\n");

    const url = `https://wa.me/919876385904?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main
        className="min-h-screen flex items-center justify-center py-20 px-4"
        data-ocid="booking.success_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border shadow-card max-w-md w-full p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Booking Received!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you, <strong>{form.name}</strong>! Your booking request has
            been received. Complete it by sending a WhatsApp message to our
            team.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-[#25D366] hover:bg-[#22c35e] text-white gap-2 py-6 text-base"
              data-ocid="booking.primary_button"
            >
              <MessageCircle className="w-5 h-5" />
              Send WhatsApp Message to Confirm
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            This will open WhatsApp with your booking details pre-filled to:{" "}
            <strong>+91 98763 85904</strong>
          </p>
          <Button
            variant="ghost"
            className="mt-4 text-muted-foreground"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                phone: "",
                email: "",
                laptopInterest: "",
                serviceType: ServiceType.demo,
                date: "",
                timeSlot: "",
                notes: "",
              });
            }}
            data-ocid="booking.secondary_button"
          >
            Make Another Booking
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4" data-ocid="booking.page">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-1">
            Schedule a Visit
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book a Demo or Appointment
          </h1>
          <p className="text-muted-foreground">
            Fill in the form below and we'll confirm your appointment via
            WhatsApp.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl border border-border shadow-card p-8 space-y-5"
          data-ocid="booking.modal"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1 text-sm">
                <User className="w-3 h-3" /> Full Name{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                data-ocid="booking.input"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="flex items-center gap-1 text-sm"
              >
                <Phone className="w-3 h-3" /> Phone Number{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                data-ocid="booking.input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1 text-sm">
              <Mail className="w-3 h-3" /> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              data-ocid="booking.input"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="laptop" className="flex items-center gap-1 text-sm">
              <Laptop className="w-3 h-3" /> Laptop Model Interest
            </Label>
            <Input
              id="laptop"
              data-ocid="booking.input"
              placeholder="e.g. Dell Latitude 5540, ASUS ROG Gaming..."
              value={form.laptopInterest}
              onChange={(e) => handleChange("laptopInterest", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-sm">
              <FileText className="w-3 h-3" /> Service Type{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.serviceType}
              onValueChange={(v) =>
                handleChange("serviceType", v as ServiceType)
              }
            >
              <SelectTrigger data-ocid="booking.select">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ServiceType.demo}>Product Demo</SelectItem>
                <SelectItem value={ServiceType.consultation}>
                  Purchase Consultation
                </SelectItem>
                <SelectItem value={ServiceType.repair}>
                  Repair Service
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-1 text-sm">
                <Calendar className="w-3 h-3" /> Preferred Date{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                data-ocid="booking.input"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                <Clock className="w-3 h-3" /> Time Slot{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.timeSlot}
                onValueChange={(v) => handleChange("timeSlot", v)}
              >
                <SelectTrigger data-ocid="booking.select">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              data-ocid="booking.textarea"
              placeholder="Any specific requirements or questions..."
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold gap-2"
              disabled={createBooking.isPending}
              data-ocid="booking.submit_button"
            >
              <MessageCircle className="w-5 h-5" />
              Submit & Continue on WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              After submitting, you'll be redirected to WhatsApp to confirm with
              our team at +91 98763 85904
            </p>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
