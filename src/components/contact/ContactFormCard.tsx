"use client";

import { useState, type FormEvent } from "react";
import {
  Button,
  Card,
  Chip,
  Form,
  Input,
  TextArea,
} from "@heroui/react";
import {
  CheckCircle2,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  RotateCcw,
  Send,
  ShoppingBag,
  Sprout,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ContactFormValues, InquiryRole } from "@/types/contact";

const ROLE_OPTIONS: Array<{
  id: InquiryRole;
  label: string;
  badge: string;
  icon: typeof User;
  placeholder: string;
}> = [
  {
    id: "buyer",
    label: "Institutional / Retail Buyer",
    badge: "Escrow & Bulk Pre-Orders",
    icon: ShoppingBag,
    placeholder:
      "Please describe your required batch volume, preferred harvest window, delivery division/district, and packaging specifications...",
  },
  {
    id: "farmer",
    label: "Farmer / Producer",
    badge: "IoT Sensors & Farm Verification",
    icon: Sprout,
    placeholder:
      "Tell us about your cultivation acreage, crop varieties (e.g., Boro rice, tomatoes), location (Upazila & District), and if you need an IoT sensor kit installed...",
  },
  {
    id: "general",
    label: "General Inquiry",
    badge: "Partnerships, Press & Support",
    icon: HelpCircle,
    placeholder:
      "How can our agritech support team help you? Please share details regarding your inquiry, partnership idea, or platform feedback...",
  },
];

const QUICK_SUBJECTS = [
  "Bulk Crop Pre-Order Contract",
  "0 ৳ Deposit IoT Sensor Installation",
  "Farmora Verification & Soil Audit",
  "Escrow Settlement & Payout Query",
  "Cold-Chain Logistics Schedule",
];

export default function ContactFormCard() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    phone: "",
    role: "buyer",
    subject: "",
    message: "",
    urgency: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("FMR-849201");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});

  const activeRoleOption =
    ROLE_OPTIONS.find((r) => r.id === formValues.role) || ROLE_OPTIONS[0];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormValues, string>> = {};

    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.subject.trim()) {
      newErrors.subject = "Please specify a subject for your inquiry.";
    }

    if (!formValues.message.trim()) {
      newErrors.message = "Please write your message.";
    } else if (formValues.message.trim().length < 15) {
      newErrors.message = "Message must be at least 15 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields accurately.", {
        duration: 4000,
        style: {
          borderRadius: "12px",
          background: "#1f1010",
          color: "#ffc9c9",
          border: "1px solid #7f1d1d",
          fontSize: "13px",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate rapid server action response
      await new Promise((resolve) => setTimeout(resolve, 950));

      setTicketId(`#FMR-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
      toast.success(
        `Thank you ${formValues.fullName.split(" ")[0]}! Your ${formValues.role} inquiry has been routed to our regional field desk.`,
        {
          duration: 5000,
          icon: "🌱",
          style: {
            borderRadius: "14px",
            background: "#0c3928",
            color: "#ffffff",
            fontSize: "14px",
            border: "1px solid #16553d",
          },
        }
      );
    } catch {
      toast.error("Failed to transmit your message. Please try again or call our hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      fullName: "",
      email: "",
      phone: "",
      role: "buyer",
      subject: "",
      message: "",
      urgency: "normal",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="flex flex-col items-center justify-center rounded-3xl border border-[#bfe4cd] bg-[#edf7f1] p-8 text-center shadow-lg transition-all dark:border-emerald-900/60 dark:bg-[#0c1f16] sm:p-12">
        <div className="grid size-16 place-items-center rounded-full bg-[#134e3a] text-white shadow-md shadow-emerald-950/20 dark:bg-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>

        <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#0a3826] sm:text-3xl dark:text-white">
          Inquiry Successfully Dispatched!
        </h3>

        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#3d5a4c] sm:text-base dark:text-emerald-200/80">
          We have assigned ticket <span className="font-semibold text-[#0a3826] dark:text-white">{ticketId}</span>. A Farmora representative will review your request and get in touch within 2 hours.
        </p>

        <div className="mt-6 w-full max-w-sm rounded-2xl border border-[#d6ecde] bg-white p-4 text-left text-xs dark:border-emerald-800/40 dark:bg-[#12271d]">
          <div className="flex justify-between py-1 border-b border-[#e5f0e8] dark:border-emerald-900/30">
            <span className="text-[#557365] dark:text-emerald-300/70">Sender:</span>
            <span className="font-semibold text-[#0a3826] dark:text-white">{formValues.fullName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#e5f0e8] dark:border-emerald-900/30">
            <span className="text-[#557365] dark:text-emerald-300/70">Role:</span>
            <span className="font-semibold uppercase text-emerald-700 dark:text-emerald-300">{formValues.role}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#557365] dark:text-emerald-300/70">Target Response:</span>
            <span className="font-semibold text-[#0a3826] dark:text-white">Under 2 hours (BST)</span>
          </div>
        </div>

        <Button
          size="md"
          variant="outline"
          onPress={handleReset}
          className="mt-8 flex items-center gap-2 rounded-2xl border border-[#cce3d6] bg-white px-6 py-2.5 text-sm font-semibold text-[#134e3a] shadow-2xs hover:bg-[#f6fbf8] dark:border-emerald-800/60 dark:bg-[#10241b] dark:text-emerald-200"
        >
          <RotateCcw className="size-4" />
          <span>Send Another Inquiry</span>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-xl shadow-emerald-950/5 transition-all dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-8 lg:p-10">
      {/* Card Header */}
      <div className="border-b border-[#eaf2ec] pb-6 dark:border-emerald-900/40">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <MessageSquare className="size-4.5" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#1e4e37] uppercase dark:text-emerald-400">
              Direct Contact Desk
            </span>
          </div>

          <Chip
            size="sm"
            className="rounded-full border border-[#cbe6d4] bg-[#edf7f1] text-[11px] font-semibold text-[#16553d] dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-300"
          >
            Guaranteed Response
          </Chip>
        </div>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0a3826] sm:text-3xl dark:text-white">
          Send Us a Direct Message
        </h2>
        <p className="mt-1.5 text-xs text-[#527061] sm:text-sm dark:text-emerald-200/75">
          Select your role below so we can instantly direct your inquiry to the relevant regional agronomists or enterprise desk.
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Role Selection Tabs */}
        <div>
          <label className="block text-xs font-bold text-[#0a3826] uppercase tracking-wider dark:text-emerald-200">
            I am reaching out as a: <span className="text-rose-500">*</span>
          </label>

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {ROLE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = formValues.role === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormValues((prev) => ({ ...prev, role: option.id }))}
                  className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#134e3a] ${
                    isSelected
                      ? "border-[#134e3a] bg-[#eaf5ee] shadow-sm dark:border-emerald-400 dark:bg-[#122c20]"
                      : "border-[#e0ebe3] bg-white hover:border-[#b4d6c0] hover:bg-[#f8fcf9] dark:border-emerald-900/40 dark:bg-[#10241b] dark:hover:border-emerald-700/50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`grid size-7 place-items-center rounded-lg ${
                        isSelected
                          ? "bg-[#134e3a] text-white dark:bg-emerald-400 dark:text-[#0a3826]"
                          : "bg-[#eaf5ee] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-300"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span
                      className={`size-2.5 rounded-full ${
                        isSelected
                          ? "bg-[#134e3a] dark:bg-emerald-400"
                          : "bg-transparent border border-gray-300 dark:border-gray-600"
                      }`}
                    />
                  </div>

                  <span
                    className={`mt-2.5 text-xs font-bold ${
                      isSelected ? "text-[#0a3826] dark:text-white" : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="mt-0.5 text-[11px] text-[#557365] dark:text-emerald-300/70">
                    {option.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Name and Email Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-fullName"
              className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-[#557365] dark:text-emerald-400">
                <User className="size-4" />
              </span>
              <Input
                id="contact-fullName"
                name="fullName"
                type="text"
                required
                value={formValues.fullName}
                onChange={(e) => {
                  setFormValues((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="e.g. Mahbubur Rahman"
                className="h-11 w-full rounded-xl border border-[#cde4d6] bg-field-background pl-10 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-[#557365] dark:text-emerald-400">
                <Mail className="size-4" />
              </span>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formValues.email}
                onChange={(e) => {
                  setFormValues((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@company.com"
                className="h-11 w-full rounded-xl border border-[#cde4d6] bg-field-background pl-10 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number & Urgency Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Contact Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-phone"
              className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100"
            >
              Phone / WhatsApp Number <span className="text-xs font-normal text-muted">(Optional)</span>
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-[#557365] dark:text-emerald-400">
                <Phone className="size-4" />
              </span>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={(e) => setFormValues((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+880 1712-345678"
                className="h-11 w-full rounded-xl border border-[#cde4d6] bg-field-background pl-10 pr-3 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
              />
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100">
              Inquiry Priority
            </label>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-[#cde4d6] bg-field-background p-1 dark:border-emerald-800/60 dark:bg-[#10241b]">
              <button
                type="button"
                onClick={() => setFormValues((prev) => ({ ...prev, urgency: "normal" }))}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                  formValues.urgency === "normal"
                    ? "bg-[#134e3a] text-white shadow-xs dark:bg-emerald-500 dark:text-[#091711]"
                    : "text-[#557365] hover:text-[#0a3826] dark:text-emerald-300/70"
                }`}
              >
                Standard Priority
              </button>
              <button
                type="button"
                onClick={() => setFormValues((prev) => ({ ...prev, urgency: "urgent" }))}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                  formValues.urgency === "urgent"
                    ? "bg-amber-600 text-white shadow-xs dark:bg-amber-500 dark:text-amber-950"
                    : "text-[#557365] hover:text-[#0a3826] dark:text-emerald-300/70"
                }`}
              >
                Urgent Field Issue
              </button>
            </div>
          </div>
        </div>

        {/* Subject with Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-subject"
              className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100"
            >
              Subject <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-[#557365] dark:text-emerald-300/70">
              Quick select below or type your own
            </span>
          </div>

          <Input
            id="contact-subject"
            name="subject"
            type="text"
            required
            value={formValues.subject}
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, subject: e.target.value }));
              if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
            }}
            placeholder="e.g. Inquiring regarding seasonal tomato harvest pre-orders"
            className="h-11 w-full rounded-xl border border-[#cde4d6] bg-field-background px-3.5 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
          />
          {errors.subject && (
            <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {errors.subject}
            </p>
          )}

          {/* Quick Subject Suggestion Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_SUBJECTS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setFormValues((prev) => ({ ...prev, subject: suggestion }));
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                }}
                className="rounded-full border border-[#d6ecde] bg-[#f4faf6] px-2.5 py-0.5 text-[11px] font-medium text-[#1e4e37] transition-colors hover:border-[#134e3a] hover:bg-[#eaf5ee] dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Message TextArea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="block text-xs font-semibold text-[#0a3826] dark:text-emerald-100"
            >
              Message Content <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-[#557365] dark:text-emerald-300/70">
              {formValues.message.length} characters
            </span>
          </div>

          <TextArea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={formValues.message}
            onChange={(e) => {
              setFormValues((prev) => ({ ...prev, message: e.target.value }));
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            placeholder={activeRoleOption.placeholder}
            className="w-full rounded-2xl border border-[#cde4d6] bg-field-background p-3.5 text-sm text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
          />
          {errors.message && (
            <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            isDisabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#134e3a] px-6 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 transition-all duration-200 hover:bg-[#0a3826] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-70 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Transmitting Inquiry to Field Desk...</span>
              </>
            ) : (
              <>
                <span>Send Inquiry via Secure Escrow Gateway</span>
                <Send className="size-4" />
              </>
            )}
          </Button>

          <p className="mt-3 text-center text-[11px] text-[#557365] dark:text-emerald-300/60">
            Protected by Farmora End-to-End Encryption. Your contact information is never shared with unauthorized third parties.
          </p>
        </div>
      </Form>
    </Card>
  );
}
