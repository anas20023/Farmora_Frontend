"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Root application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f5f8f5", color: "#1f362d" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
          <section style={{ maxWidth: "440px", padding: "32px", textAlign: "center", borderRadius: "16px", background: "#ffffff", boxShadow: "0 12px 32px rgba(31,54,45,.12)" }}>
            <AlertTriangle aria-hidden="true" size={30} color="#c63535" />
            <h1>Farmora needs a moment</h1>
            <p style={{ color: "#5f6f67", lineHeight: 1.6 }}>We ran into an unexpected problem. Please try loading Farmora again.</p>
            <button type="button" onClick={reset} style={{ display: "inline-flex", gap: "8px", alignItems: "center", border: 0, borderRadius: "8px", padding: "11px 16px", background: "#176d61", color: "white", fontWeight: 600, cursor: "pointer" }}>
              <RefreshCw aria-hidden="true" size={16} />
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
