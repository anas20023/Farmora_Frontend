"use client";

import { useState } from "react";
import {
  Accordion,
  Button,
} from "@heroui/react";
import {
  CreditCard,
  HelpCircle,
  Radio,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import type { FaqCategory, FaqItem } from "@/types/contact";

interface FaqSectionProps {
  faqs: FaqItem[];
}

const CATEGORY_TABS: Array<{ id: FaqCategory; label: string; icon: typeof HelpCircle }> = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "ordering", label: "Ordering & Escrow", icon: ShoppingBag },
  { id: "verification", label: "Farm Verification", icon: ShieldCheck },
  { id: "delivery", label: "Cold-Chain Delivery", icon: Truck },
  { id: "payments", label: "Payments & Invoicing", icon: CreditCard },
  { id: "telemetry", label: "IoT Sensors", icon: Radio },
];

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.highlight && faq.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="relative w-full rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-xl shadow-emerald-950/5 dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-10"
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-[#eaf2ec] pb-6 md:flex-row md:items-end dark:border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <HelpCircle className="size-4.5" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#1e4e37] uppercase dark:text-emerald-400">
              Knowledge Base & Support FAQ
            </span>
          </div>

          <h2
            id="faq-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-[#0a3826] sm:text-3xl dark:text-white"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-xs text-[#527061] sm:text-sm dark:text-emerald-200/75">
            Transparent answers regarding ordering escrow, farm audits, IoT sensor setups, and guaranteed deliveries.
          </p>
        </div>

        {/* Search Input Filter */}
        <div className="relative w-full md:w-72">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="h-10 w-full rounded-xl border border-[#cde4d6] bg-field-background pl-9 pr-3 text-xs text-field-foreground placeholder:text-field-placeholder transition-colors focus:border-[#134e3a] focus:outline-none focus:ring-1 focus:ring-[#134e3a] dark:border-emerald-800/60 dark:bg-[#10241b]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedCategory === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#134e3a] text-white shadow-xs dark:bg-emerald-500 dark:text-[#091711]"
                  : "border border-[#d6ecde] bg-[#f8fcf9] text-[#1e4e37] hover:border-[#134e3a] hover:bg-[#eaf5ee] dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion using Hero UI v3 Accordion */}
      <div className="mt-6">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cde4d6] bg-[#f8fcf9] p-8 text-center dark:border-emerald-900/50 dark:bg-[#10241b]">
            <p className="text-sm font-semibold text-[#0a3826] dark:text-white">
              No matching questions found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-xs text-[#527061] dark:text-emerald-300/70">
              Try searching with another keyword or reach out directly to our 24/7 hotline.
            </p>
            <Button
              size="sm"
              variant="outline"
              onPress={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-xl border-[#cde4d6] text-[#134e3a] dark:border-emerald-800 dark:text-emerald-300"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Accordion
            className="w-full space-y-3"
            variant="surface"
          >
            {filteredFaqs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                id={faq.id}
                className="overflow-hidden rounded-2xl border border-[#dceee2] bg-[#fbfdfc] transition-all hover:border-emerald-300 dark:border-emerald-900/40 dark:bg-[#10241b] dark:hover:border-emerald-800/60"
              >
                <Accordion.Heading>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                    <div className="flex items-start gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-md bg-[#e3f4ea] text-[#134e3a] text-xs font-bold dark:bg-emerald-950 dark:text-emerald-400">
                        Q
                      </span>
                      <div>
                        <span className="text-sm font-bold text-[#0a3826] sm:text-base dark:text-white">
                          {faq.question}
                        </span>
                        {faq.highlight && (
                          <div className="mt-1">
                            <span className="inline-block rounded-md bg-[#e3f4ea] px-2 py-0.5 text-[10px] font-bold text-[#145339] dark:bg-emerald-950/70 dark:text-emerald-300">
                              {faq.highlight}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Accordion.Indicator className="size-4 shrink-0 text-[#134e3a] transition-transform duration-200 dark:text-emerald-400" />
                  </Accordion.Trigger>
                </Accordion.Heading>

                <Accordion.Panel>
                  <Accordion.Body className="border-t border-[#edf4ef] bg-white px-5 py-4 text-xs leading-relaxed text-[#496557] sm:text-sm dark:border-emerald-900/30 dark:bg-[#0c1c14] dark:text-emerald-200/80">
                    <p>{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
