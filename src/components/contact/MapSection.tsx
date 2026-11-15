"use client";

import { Card } from "@heroui/react";
import {
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Radio,
} from "lucide-react";
import toast from "react-hot-toast";
import type { OfficeLocation } from "@/types/contact";

interface MapSectionProps {
  offices: OfficeLocation[];
  selectedOffice: OfficeLocation;
  onSelectOffice: (office: OfficeLocation) => void;
}

export default function MapSection({
  offices,
  selectedOffice,
  onSelectOffice,
}: MapSectionProps) {

  const handleCopyCoords = () => {
    const coordsStr = `${selectedOffice.coordinates.lat.toFixed(4)}° N, ${selectedOffice.coordinates.lng.toFixed(4)}° E`;
    navigator.clipboard.writeText(coordsStr);
    toast.success(`Copied coordinates (${coordsStr}) to clipboard!`, {
      icon: "📍",
      style: {
        borderRadius: "12px",
        background: "#0c3928",
        color: "#ffffff",
        fontSize: "13px",
      },
    });
  };

  return (
    <section className="relative w-full">
      <Card className="overflow-hidden rounded-3xl border border-[#d2e8db] bg-white shadow-xl shadow-emerald-950/5 dark:border-emerald-900/60 dark:bg-[#0c1c14]">
        {/* Top Header Row with Location Selector Pills */}
        <div className="flex flex-col gap-4 border-b border-[#eaf2ec] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-emerald-900/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-[#e3f4ea] text-[#134e3a] dark:bg-emerald-950/60 dark:text-emerald-400">
                <MapPin className="size-4" />
              </span>
              <h3 className="text-base font-extrabold tracking-tight text-[#0a3826] sm:text-lg dark:text-white">
                Interactive Agro-Hub Map & Field Centers
              </h3>
            </div>
            <p className="mt-0.5 text-xs text-[#527061] dark:text-emerald-200/70">
              Select an agricultural hub to view active telemetry infrastructure and physical location
            </p>
          </div>

          {/* Hub Selection Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {offices.map((office) => {
              const isSelected = selectedOffice.id === office.id;
              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => onSelectOffice(office)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#134e3a] text-white shadow-xs dark:bg-emerald-500 dark:text-[#091711]"
                      : "border border-[#cde4d6] bg-[#f8fcf9] text-[#1e4e37] hover:bg-[#eaf5ee] dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isSelected ? "bg-emerald-300 dark:bg-[#091711]" : "bg-emerald-600 dark:bg-emerald-400"
                    }`}
                  />
                  <span>{office.address.division} Hub</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container Area */}
        <div className="relative h-[380px] w-full overflow-hidden bg-[#e4ede7] sm:h-[440px] dark:bg-[#08150f]">
          {/* Real Embedded Google Map */}
          <iframe
            key={selectedOffice.id}
            title={`${selectedOffice.name} Map`}
            src={selectedOffice.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full opacity-90 transition-opacity duration-300 hover:opacity-100 dark:brightness-85 dark:contrast-110 dark:invert-[0.9] dark:hue-rotate-180"
          />

          {/* Floating Location Overlay Card (Styled Pin & Details) */}
          <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md">
            <div className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md transition-all dark:border-emerald-800/50 dark:bg-[#0e2117]/95">
              <div className="flex items-start gap-3">
                {/* Styled Pin Icon */}
                <div className="relative mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-[#134e3a] text-white shadow-md shadow-emerald-950/20 dark:bg-emerald-500 dark:text-[#091711]">
                  <MapPin className="size-5" />
                  <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {selectedOffice.hubType}
                    </span>
                    <span className="text-[11px] font-semibold text-[#527061] dark:text-emerald-300/70">
                      {selectedOffice.address.division} Division
                    </span>
                  </div>

                  <h4 className="mt-1 text-sm font-bold text-[#0a3826] sm:text-base dark:text-white">
                    {selectedOffice.name}
                  </h4>

                  <p className="mt-1 text-xs text-[#527061] dark:text-emerald-200/80">
                    {selectedOffice.address.streetAddress}, {selectedOffice.address.upazila},{" "}
                    {selectedOffice.address.district} - {selectedOffice.address.postalCode}
                  </p>

                  {/* Telemetry Node status bar */}
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#edf4ef] pt-2 text-[11px] dark:border-emerald-900/40">
                    <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
                      <Radio className="size-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                      {selectedOffice.activeSensorsMonitored} Live Field Nodes
                    </span>

                    <button
                      type="button"
                      onClick={handleCopyCoords}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#134e3a] hover:underline dark:text-emerald-300"
                    >
                      <Copy className="size-3" />
                      <span>
                        {selectedOffice.coordinates.lat.toFixed(2)}°, {selectedOffice.coordinates.lng.toFixed(2)}°
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2 border-t border-[#edf4ef] pt-2.5 dark:border-emerald-900/40">
                <a
                  href={selectedOffice.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#134e3a] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0a3826] dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  <Navigation className="size-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="size-3 opacity-80" />
                </a>

                <a
                  href={`tel:${selectedOffice.phone}`}
                  className="rounded-xl border border-[#cde4d6] bg-[#f8fcf9] px-3.5 py-2 text-xs font-semibold text-[#134e3a] hover:bg-[#eaf5ee] dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200"
                >
                  Call Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
