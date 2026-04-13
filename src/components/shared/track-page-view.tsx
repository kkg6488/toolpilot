"use client";

import { useEffect, useRef } from "react";
import {
  trackCalculatorUsed,
  trackToolUsed,
  trackConversionDone,
} from "@/lib/analytics";

type TrackType = "calculator" | "tool" | "conversion";

export function TrackPageView({
  name,
  type,
}: {
  name: string;
  type: TrackType;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    switch (type) {
      case "calculator":
        trackCalculatorUsed(name);
        break;
      case "tool":
        trackToolUsed(name);
        break;
      case "conversion":
        trackConversionDone(name);
        break;
    }
  }, [name, type]);
  return null;
}
