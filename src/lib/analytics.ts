type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackCalculatorUsed(calculatorName: string) {
  trackEvent({
    action: "calculator_used",
    category: "engagement",
    label: calculatorName,
  });
}

export function trackToolUsed(toolName: string) {
  trackEvent({
    action: "tool_used",
    category: "engagement",
    label: toolName,
  });
}

export function trackConversionDone(conversionType: string) {
  trackEvent({
    action: "conversion_done",
    category: "engagement",
    label: conversionType,
  });
}
