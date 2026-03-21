"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const formatStyles = {
  horizontal: "min-h-[90px] w-full max-w-[728px]",
  vertical: "min-h-[600px] w-[160px] max-w-[160px]",
  rectangle: "min-h-[250px] w-full max-w-[336px]",
} as const;

export type AdSlotProps = {
  slot: string;
  className?: string;
  format?: "horizontal" | "vertical" | "rectangle";
};

export function AdSlot({ slot, className, format = "rectangle" }: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isDev = process.env.NODE_ENV === "development";
  const dims = formatStyles[format];

  React.useEffect(() => {
    if (isDev || !clientId) return;
    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // AdSense may not be available (ad blockers, etc.)
    }
  }, [isDev, clientId, slot]);

  if (isDev) {
    return (
      <div
        role="complementary"
        aria-label="Advertisement placeholder"
        data-ad-slot={slot}
        className={cn(
          "mx-auto flex items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/35 bg-muted/40 text-sm font-medium text-muted-foreground",
          dims,
          className
        )}
      >
        Ad
      </div>
    );
  }

  if (!clientId) {
    return (
      <div
        className={cn("mx-auto", dims, className)}
        data-ad-slot={slot}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("mx-auto flex justify-center", className)}>
      <ins
        className={cn("adsbygoogle block", dims)}
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
