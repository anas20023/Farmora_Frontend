"use client";

import { useState } from "react";
import {
  Card,
  Chip,
} from "@heroui/react";
import {
  Building2,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import type { ContactPageData, OfficeLocation } from "@/types/contact";

interface InfoCardsGridProps {
  phones: ContactPageData["phones"];
  emails: ContactPageData["emails"];
  workingHours: ContactPageData["workingHours"];
  offices: ContactPageData["offices"];
  onSelectOffice?: (office: OfficeLocation) => void;
  selectedOfficeId?: string;
}

export default function InfoCardsGrid({
  phones,
  emails,
  workingHours,
  offices,
  onSelectOffice,
  selectedOfficeId,
}: InfoCardsGridProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success(`Copied ${label} to clipboard!`, {
      duration: 3000,
      icon: "📋",
      style: {
        borderRadius: "12px",
        background: "#0c3928",
        color: "#ffffff",
        fontSize: "13px",
      },
    });
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Phone Support Channels Card */}
      <Card className="rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-md transition-all dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-7">
        <div className="flex items-center justify-between border-b border-[#eaf2ec] pb-4 dark:border-emerald-900/40">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <Phone className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0a3826] dark:text-white">
                Phone Support Lines
              </h3>
              <p className="text-xs text-[#527061] dark:text-emerald-200/70">
                Direct phone lines in Bangla & regional dialects
              </p>
            </div>
          </div>
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          </span>
        </div>

        <div className="mt-4 divide-y divide-[#f0f6f2] dark:divide-emerald-900/30">
          {phones.map((phone, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-3 py-3.5 first:pt-1 last:pb-1 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0a3826] dark:text-white">
                    {phone.title}
                  </span>
                  {phone.badge && (
                    <span className="rounded-full bg-[#e3f4ea] px-2 py-0.5 text-[10px] font-bold text-[#145339] dark:bg-emerald-950/70 dark:text-emerald-300">
                      {phone.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[#527061] dark:text-emerald-300/70">
                  {phone.availability}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${phone.number}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#cde4d6] bg-[#f4faf6] px-3.5 py-1.5 text-xs font-bold text-[#134e3a] shadow-2xs transition-colors hover:border-[#134e3a] hover:bg-[#eaf5ee] dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                >
                  <Phone className="size-3" />
                  <span>{phone.displayNumber}</span>
                </a>

                <button
                  type="button"
                  aria-label={`Copy phone number ${phone.displayNumber}`}
                  onClick={() => handleCopy(phone.number, phone.title)}
                  className="grid size-8 place-items-center rounded-xl border border-[#cde4d6] text-[#527061] transition-colors hover:bg-surface-secondary dark:border-emerald-800/50 dark:text-emerald-300"
                  title="Copy number"
                >
                  {copiedText === phone.number ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Official Email Channels Card */}
      <Card className="rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-md transition-all dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-7">
        <div className="flex items-center justify-between border-b border-[#eaf2ec] pb-4 dark:border-emerald-900/40">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <Mail className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0a3826] dark:text-white">
                Official Email Addresses
              </h3>
              <p className="text-xs text-[#527061] dark:text-emerald-200/70">
                Departmental routing with guaranteed SLA response times
              </p>
            </div>
          </div>
          <Chip
            size="sm"
            className="rounded-full border border-[#cbe6d4] bg-[#edf7f1] text-[10px] font-semibold text-[#16553d] dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-300"
          >
            Encrypted
          </Chip>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {emails.map((emailItem, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-[#dceee2] bg-[#f8fcf9] p-4 transition-all hover:border-[#134e3a]/30 dark:border-emerald-900/40 dark:bg-[#10241b]"
            >
              <div>
                <span className="text-xs font-bold text-[#0a3826] dark:text-white">
                  {emailItem.department}
                </span>
                <p className="mt-1 text-[11px] leading-relaxed text-[#527061] dark:text-emerald-200/70">
                  {emailItem.purpose}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#eaf2ec] pt-2.5 dark:border-emerald-900/30">
                <a
                  href={`mailto:${emailItem.email}`}
                  className="text-xs font-bold text-[#134e3a] hover:underline dark:text-emerald-300"
                >
                  {emailItem.email}
                </a>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted">{emailItem.responseTime}</span>
                  <button
                    type="button"
                    aria-label={`Copy email ${emailItem.email}`}
                    onClick={() => handleCopy(emailItem.email, emailItem.department)}
                    className="grid size-6 place-items-center rounded-md border border-[#cde4d6] text-[#527061] hover:bg-white dark:border-emerald-800/50 dark:text-emerald-300 dark:hover:bg-emerald-950"
                  >
                    {copiedText === emailItem.email ? (
                      <Check className="size-3 text-emerald-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Physical Address Cards (Administrative Division Breakdown) */}
      <Card className="rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-md transition-all dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-7">
        <div className="flex flex-col gap-2 border-b border-[#eaf2ec] pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/40">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <Building2 className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0a3826] dark:text-white">
                Physical Office & Regional Hubs
              </h3>
              <p className="text-xs text-[#527061] dark:text-emerald-200/70">
                Structured CustomerAddress locations across major agricultural divisions
              </p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-[#16553d] dark:text-emerald-300">
            Click hub to preview on Map
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {offices.map((office) => {
            const isSelected = selectedOfficeId === office.id;
            const { address } = office;

            return (
              <div
                key={office.id}
                onClick={() => onSelectOffice?.(office)}
                className={`group flex cursor-pointer flex-col justify-between rounded-2xl border p-4.5 transition-all duration-200 ${
                  isSelected
                    ? "border-[#134e3a] bg-[#edf7f1] shadow-sm dark:border-emerald-400 dark:bg-[#122c20]"
                    : "border-[#d8ebe0] bg-[#fbfdfc] hover:border-emerald-400 hover:bg-[#f4faf6] dark:border-emerald-900/40 dark:bg-[#10241b] dark:hover:border-emerald-700/60"
                }`}
              >
                <div>
                  {/* Hub Tag */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        office.hubType === "Headquarters"
                          ? "bg-[#134e3a] text-white dark:bg-emerald-500 dark:text-[#091711]"
                          : "bg-[#d8f2e2] text-[#135036] dark:bg-emerald-950 dark:text-emerald-300"
                      }`}
                    >
                      {office.hubType}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#527061] dark:text-emerald-300/70">
                      <Radio className="size-3 text-emerald-600 dark:text-emerald-400" />
                      {office.activeSensorsMonitored} Nodes
                    </span>
                  </div>

                  {/* Office Name */}
                  <h4 className="mt-2.5 text-sm font-bold text-[#0a3826] dark:text-white">
                    {office.name}
                  </h4>

                  {/* Administrative Division Structure (CustomerAddress) */}
                  <div className="mt-3 space-y-1.5 rounded-xl border border-[#d8ebe0] bg-white/80 p-2.5 text-[11px] dark:border-emerald-900/30 dark:bg-[#0c1c14]/70">
                    <div className="flex items-center justify-between">
                      <span className="text-[#557365] dark:text-emerald-300/60">Division:</span>
                      <span className="font-semibold text-[#0a3826] dark:text-white">
                        {address.division}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#557365] dark:text-emerald-300/60">District (Zila):</span>
                      <span className="font-semibold text-[#0a3826] dark:text-white">
                        {address.district}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#557365] dark:text-emerald-300/60">Upazila (Thana):</span>
                      <span className="font-semibold text-[#0a3826] dark:text-white">
                        {address.upazila}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#557365] dark:text-emerald-300/60">Postal Code:</span>
                      <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                        {address.postalCode}
                      </span>
                    </div>
                  </div>

                  {/* Full Street Address */}
                  <p className="mt-2 text-xs leading-relaxed text-[#496557] dark:text-emerald-200/75">
                    <MapPin className="mr-1 inline-block size-3 text-[#134e3a] dark:text-emerald-400" />
                    {address.streetAddress}, {address.area}
                  </p>
                  {address.landmark && (
                    <p className="mt-1 text-[11px] text-[#557365] dark:text-emerald-300/60 italic">
                      Landmark: {address.landmark}
                    </p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-[#eaf2ec] pt-3 dark:border-emerald-900/30">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fullAddr = `${address.streetAddress}, ${address.upazila}, ${address.district} - ${address.postalCode}, ${address.division}, Bangladesh`;
                      handleCopy(fullAddr, `${office.name} address`);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#134e3a] hover:underline dark:text-emerald-300"
                  >
                    <Copy className="size-3" />
                    <span>Copy Address</span>
                  </button>

                  <a
                    href={office.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#134e3a] hover:underline dark:text-emerald-300"
                  >
                    <span>Directions</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Business Working Hours Card */}
      <Card className="rounded-3xl border border-[#d2e8db] bg-white p-6 shadow-md transition-all dark:border-emerald-900/60 dark:bg-[#0c1c14] sm:p-7">
        <div className="flex items-center justify-between border-b border-[#eaf2ec] pb-4 dark:border-emerald-900/40">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
              <Clock className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0a3826] dark:text-white">
                Business Working Hours
              </h3>
              <p className="text-xs text-[#527061] dark:text-emerald-200/70">
                {workingHours.timezone}
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Open Today
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Weekdays */}
          <div className="rounded-2xl border border-[#dceee2] bg-[#f8fcf9] p-3.5 dark:border-emerald-900/40 dark:bg-[#10241b]">
            <span className="text-xs font-bold text-[#0a3826] dark:text-white">
              {workingHours.weekdays.days}
            </span>
            <div className="mt-1 text-base font-extrabold text-[#134e3a] dark:text-emerald-300">
              {workingHours.weekdays.hours}
            </div>
            <p className="mt-1 text-[11px] text-[#557365] dark:text-emerald-200/70">
              {workingHours.weekdays.status}
            </p>
          </div>

          {/* Saturday */}
          <div className="rounded-2xl border border-[#dceee2] bg-[#f8fcf9] p-3.5 dark:border-emerald-900/40 dark:bg-[#10241b]">
            <span className="text-xs font-bold text-[#0a3826] dark:text-white">
              {workingHours.saturday.days}
            </span>
            <div className="mt-1 text-base font-extrabold text-[#134e3a] dark:text-emerald-300">
              {workingHours.saturday.hours}
            </div>
            <p className="mt-1 text-[11px] text-[#557365] dark:text-emerald-200/70">
              {workingHours.saturday.status}
            </p>
          </div>

          {/* Friday */}
          <div className="rounded-2xl border border-[#dceee2] bg-[#f8fcf9] p-3.5 dark:border-emerald-900/40 dark:bg-[#10241b]">
            <span className="text-xs font-bold text-[#0a3826] dark:text-white">
              {workingHours.friday.days}
            </span>
            <div className="mt-1 text-base font-extrabold text-amber-700 dark:text-amber-400">
              {workingHours.friday.hours}
            </div>
            <p className="mt-1 text-[11px] text-[#557365] dark:text-emerald-200/70">
              {workingHours.friday.status}
            </p>
          </div>
        </div>

        <p className="mt-3.5 flex items-center gap-1.5 text-xs text-[#527061] dark:text-emerald-300/70">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{workingHours.note}</span>
        </p>
      </Card>
    </div>
  );
}
