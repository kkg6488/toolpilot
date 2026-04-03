export interface ConversionPair {
  fromSlug: string;
  toSlug: string;
  fromUnit: string;
  toUnit: string;
  fromSymbol: string;
  toSymbol: string;
  category: string;
  convert: (v: number) => number;
  formula: string;
  explanation: string;
}

export const conversionPairs: ConversionPair[] = [
  // Weight
  {
    fromSlug: "kg", toSlug: "lbs", fromUnit: "Kilogram", toUnit: "Pound",
    fromSymbol: "kg", toSymbol: "lb", category: "Weight",
    convert: (v) => v * 2.20462,
    formula: "multiply by 2.20462",
    explanation: "One kilogram equals approximately 2.205 pounds. The kilogram is the SI base unit of mass, while the pound is used primarily in the United States and United Kingdom.",
  },
  {
    fromSlug: "lbs", toSlug: "kg", fromUnit: "Pound", toUnit: "Kilogram",
    fromSymbol: "lb", toSymbol: "kg", category: "Weight",
    convert: (v) => v * 0.453592,
    formula: "multiply by 0.453592",
    explanation: "One pound equals approximately 0.454 kilograms. The pound is commonly used in the US, while most of the world uses kilograms.",
  },
  {
    fromSlug: "oz", toSlug: "g", fromUnit: "Ounce", toUnit: "Gram",
    fromSymbol: "oz", toSymbol: "g", category: "Weight",
    convert: (v) => v * 28.3495,
    formula: "multiply by 28.3495",
    explanation: "One ounce equals approximately 28.35 grams. Ounces are commonly used in the US for measuring food and small quantities.",
  },
  {
    fromSlug: "g", toSlug: "oz", fromUnit: "Gram", toUnit: "Ounce",
    fromSymbol: "g", toSymbol: "oz", category: "Weight",
    convert: (v) => v * 0.035274,
    formula: "multiply by 0.035274",
    explanation: "One gram equals approximately 0.035 ounces. Grams are the standard metric unit for small masses.",
  },

  // Length
  {
    fromSlug: "km", toSlug: "miles", fromUnit: "Kilometer", toUnit: "Mile",
    fromSymbol: "km", toSymbol: "mi", category: "Length",
    convert: (v) => v * 0.621371,
    formula: "multiply by 0.621371",
    explanation: "One kilometer equals approximately 0.621 miles. Kilometers are used worldwide except in the US, UK, and a few other countries that use miles.",
  },
  {
    fromSlug: "miles", toSlug: "km", fromUnit: "Mile", toUnit: "Kilometer",
    fromSymbol: "mi", toSymbol: "km", category: "Length",
    convert: (v) => v * 1.60934,
    formula: "multiply by 1.60934",
    explanation: "One mile equals approximately 1.609 kilometers. Miles are used for road distances in the US and UK.",
  },
  {
    fromSlug: "cm", toSlug: "inches", fromUnit: "Centimeter", toUnit: "Inch",
    fromSymbol: "cm", toSymbol: "in", category: "Length",
    convert: (v) => v * 0.393701,
    formula: "multiply by 0.393701",
    explanation: "One centimeter equals approximately 0.394 inches. This conversion is commonly used for height, screen sizes, and everyday measurements.",
  },
  {
    fromSlug: "inches", toSlug: "cm", fromUnit: "Inch", toUnit: "Centimeter",
    fromSymbol: "in", toSymbol: "cm", category: "Length",
    convert: (v) => v * 2.54,
    formula: "multiply by 2.54",
    explanation: "One inch equals exactly 2.54 centimeters. This is an exact conversion defined by international agreement.",
  },
  {
    fromSlug: "m", toSlug: "feet", fromUnit: "Meter", toUnit: "Foot",
    fromSymbol: "m", toSymbol: "ft", category: "Length",
    convert: (v) => v * 3.28084,
    formula: "multiply by 3.28084",
    explanation: "One meter equals approximately 3.281 feet. Meters are the SI base unit of length used globally.",
  },
  {
    fromSlug: "feet", toSlug: "m", fromUnit: "Foot", toUnit: "Meter",
    fromSymbol: "ft", toSymbol: "m", category: "Length",
    convert: (v) => v * 0.3048,
    formula: "multiply by 0.3048",
    explanation: "One foot equals exactly 0.3048 meters. Feet are commonly used for height and room dimensions in the US.",
  },
  {
    fromSlug: "mm", toSlug: "inches", fromUnit: "Millimeter", toUnit: "Inch",
    fromSymbol: "mm", toSymbol: "in", category: "Length",
    convert: (v) => v * 0.0393701,
    formula: "multiply by 0.0393701",
    explanation: "One millimeter equals approximately 0.039 inches. Millimeters are used for precise measurements in engineering and manufacturing.",
  },
  {
    fromSlug: "yards", toSlug: "m", fromUnit: "Yard", toUnit: "Meter",
    fromSymbol: "yd", toSymbol: "m", category: "Length",
    convert: (v) => v * 0.9144,
    formula: "multiply by 0.9144",
    explanation: "One yard equals exactly 0.9144 meters. Yards are used in the US for fabric, football fields, and golf.",
  },

  // Temperature
  {
    fromSlug: "celsius", toSlug: "fahrenheit", fromUnit: "Celsius", toUnit: "Fahrenheit",
    fromSymbol: "°C", toSymbol: "°F", category: "Temperature",
    convert: (v) => (v * 9) / 5 + 32,
    formula: "multiply by 9/5 then add 32",
    explanation: "The Celsius and Fahrenheit scales meet at -40°. Water freezes at 0°C (32°F) and boils at 100°C (212°F).",
  },
  {
    fromSlug: "fahrenheit", toSlug: "celsius", fromUnit: "Fahrenheit", toUnit: "Celsius",
    fromSymbol: "°F", toSymbol: "°C", category: "Temperature",
    convert: (v) => ((v - 32) * 5) / 9,
    formula: "subtract 32 then multiply by 5/9",
    explanation: "To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9. Normal body temperature is 98.6°F (37°C).",
  },
  {
    fromSlug: "celsius", toSlug: "kelvin", fromUnit: "Celsius", toUnit: "Kelvin",
    fromSymbol: "°C", toSymbol: "K", category: "Temperature",
    convert: (v) => v + 273.15,
    formula: "add 273.15",
    explanation: "Kelvin is the SI unit of temperature. 0 K (-273.15°C) is absolute zero, the coldest possible temperature.",
  },

  // Volume
  {
    fromSlug: "liters", toSlug: "gallons", fromUnit: "Liter", toUnit: "Gallon (US)",
    fromSymbol: "L", toSymbol: "gal", category: "Volume",
    convert: (v) => v * 0.264172,
    formula: "multiply by 0.264172",
    explanation: "One liter equals approximately 0.264 US gallons. The US gallon is smaller than the Imperial gallon used in the UK.",
  },
  {
    fromSlug: "gallons", toSlug: "liters", fromUnit: "Gallon (US)", toUnit: "Liter",
    fromSymbol: "gal", toSymbol: "L", category: "Volume",
    convert: (v) => v * 3.78541,
    formula: "multiply by 3.78541",
    explanation: "One US gallon equals approximately 3.785 liters. Gallons are used for fuel and large liquid volumes in the US.",
  },
  {
    fromSlug: "ml", toSlug: "cups", fromUnit: "Milliliter", toUnit: "Cup (US)",
    fromSymbol: "mL", toSymbol: "cup", category: "Volume",
    convert: (v) => v / 236.588,
    formula: "divide by 236.588",
    explanation: "One US cup equals 236.588 milliliters. Cups are commonly used in cooking recipes in the United States.",
  },
  {
    fromSlug: "cups", toSlug: "ml", fromUnit: "Cup (US)", toUnit: "Milliliter",
    fromSymbol: "cup", toSymbol: "mL", category: "Volume",
    convert: (v) => v * 236.588,
    formula: "multiply by 236.588",
    explanation: "One US cup equals 236.588 milliliters. Converting cups to mL is essential when following recipes from different countries.",
  },

  // Area
  {
    fromSlug: "sqft", toSlug: "sqm", fromUnit: "Square Foot", toUnit: "Square Meter",
    fromSymbol: "ft²", toSymbol: "m²", category: "Area",
    convert: (v) => v * 0.092903,
    formula: "multiply by 0.092903",
    explanation: "One square foot equals approximately 0.093 square meters. This conversion is essential for real estate across countries.",
  },
  {
    fromSlug: "sqm", toSlug: "sqft", fromUnit: "Square Meter", toUnit: "Square Foot",
    fromSymbol: "m²", toSymbol: "ft²", category: "Area",
    convert: (v) => v * 10.7639,
    formula: "multiply by 10.7639",
    explanation: "One square meter equals approximately 10.764 square feet. Square meters are the global standard for property measurements.",
  },
  {
    fromSlug: "acres", toSlug: "hectares", fromUnit: "Acre", toUnit: "Hectare",
    fromSymbol: "ac", toSymbol: "ha", category: "Area",
    convert: (v) => v * 0.404686,
    formula: "multiply by 0.404686",
    explanation: "One acre equals approximately 0.405 hectares. Acres are used for land measurement in the US, while hectares are used globally.",
  },
  {
    fromSlug: "hectares", toSlug: "acres", fromUnit: "Hectare", toUnit: "Acre",
    fromSymbol: "ha", toSymbol: "ac", category: "Area",
    convert: (v) => v * 2.47105,
    formula: "multiply by 2.47105",
    explanation: "One hectare equals approximately 2.471 acres. A hectare is 10,000 square meters.",
  },

  // Speed
  {
    fromSlug: "kmh", toSlug: "mph", fromUnit: "Kilometer per hour", toUnit: "Mile per hour",
    fromSymbol: "km/h", toSymbol: "mph", category: "Speed",
    convert: (v) => v * 0.621371,
    formula: "multiply by 0.621371",
    explanation: "One km/h equals approximately 0.621 mph. Most countries use km/h for speed limits, while the US and UK use mph.",
  },
  {
    fromSlug: "mph", toSlug: "kmh", fromUnit: "Mile per hour", toUnit: "Kilometer per hour",
    fromSymbol: "mph", toSymbol: "km/h", category: "Speed",
    convert: (v) => v * 1.60934,
    formula: "multiply by 1.60934",
    explanation: "One mph equals approximately 1.609 km/h. This conversion is useful when traveling between countries with different speed systems.",
  },

  // Digital
  {
    fromSlug: "mb", toSlug: "gb", fromUnit: "Megabyte", toUnit: "Gigabyte",
    fromSymbol: "MB", toSymbol: "GB", category: "Digital Storage",
    convert: (v) => v / 1024,
    formula: "divide by 1024",
    explanation: "One gigabyte equals 1024 megabytes in binary (computing) or 1000 megabytes in decimal (storage marketing).",
  },
  {
    fromSlug: "gb", toSlug: "mb", fromUnit: "Gigabyte", toUnit: "Megabyte",
    fromSymbol: "GB", toSymbol: "MB", category: "Digital Storage",
    convert: (v) => v * 1024,
    formula: "multiply by 1024",
    explanation: "One gigabyte contains 1024 megabytes. Knowing this helps when comparing file sizes, storage plans, and data usage.",
  },
  {
    fromSlug: "gb", toSlug: "tb", fromUnit: "Gigabyte", toUnit: "Terabyte",
    fromSymbol: "GB", toSymbol: "TB", category: "Digital Storage",
    convert: (v) => v / 1024,
    formula: "divide by 1024",
    explanation: "One terabyte equals 1024 gigabytes. Terabytes are used to measure hard drive and cloud storage capacity.",
  },

  // Additional Weight
  {
    fromSlug: "kg", toSlug: "stone", fromUnit: "Kilogram", toUnit: "Stone",
    fromSymbol: "kg", toSymbol: "st", category: "Weight",
    convert: (v) => v * 0.157473,
    formula: "multiply by 0.157473",
    explanation: "One kilogram equals approximately 0.157 stone. Stone is commonly used for body weight in the UK and Ireland.",
  },
  {
    fromSlug: "stone", toSlug: "kg", fromUnit: "Stone", toUnit: "Kilogram",
    fromSymbol: "st", toSymbol: "kg", category: "Weight",
    convert: (v) => v * 6.35029,
    formula: "multiply by 6.35029",
    explanation: "One stone equals approximately 6.35 kilograms. Stone is a traditional British unit of weight equal to 14 pounds.",
  },

  // Additional Length
  {
    fromSlug: "inches", toSlug: "feet", fromUnit: "Inch", toUnit: "Foot",
    fromSymbol: "in", toSymbol: "ft", category: "Length",
    convert: (v) => v / 12,
    formula: "divide by 12",
    explanation: "One foot equals exactly 12 inches. This is the standard US customary unit conversion for small lengths.",
  },
  {
    fromSlug: "feet", toSlug: "inches", fromUnit: "Foot", toUnit: "Inch",
    fromSymbol: "ft", toSymbol: "in", category: "Length",
    convert: (v) => v * 12,
    formula: "multiply by 12",
    explanation: "One foot equals exactly 12 inches. Commonly used for height and room dimensions.",
  },
  {
    fromSlug: "cm", toSlug: "mm", fromUnit: "Centimeter", toUnit: "Millimeter",
    fromSymbol: "cm", toSymbol: "mm", category: "Length",
    convert: (v) => v * 10,
    formula: "multiply by 10",
    explanation: "One centimeter equals exactly 10 millimeters. Both are metric units commonly used in everyday measurements.",
  },
  {
    fromSlug: "mm", toSlug: "cm", fromUnit: "Millimeter", toUnit: "Centimeter",
    fromSymbol: "mm", toSymbol: "cm", category: "Length",
    convert: (v) => v / 10,
    formula: "divide by 10",
    explanation: "One centimeter equals 10 millimeters. Millimeters are used for precise measurements in engineering.",
  },
  {
    fromSlug: "km", toSlug: "m", fromUnit: "Kilometer", toUnit: "Meter",
    fromSymbol: "km", toSymbol: "m", category: "Length",
    convert: (v) => v * 1000,
    formula: "multiply by 1000",
    explanation: "One kilometer equals exactly 1000 meters. Both are standard SI units of length.",
  },
  {
    fromSlug: "m", toSlug: "km", fromUnit: "Meter", toUnit: "Kilometer",
    fromSymbol: "m", toSymbol: "km", category: "Length",
    convert: (v) => v / 1000,
    formula: "divide by 1000",
    explanation: "One kilometer equals 1000 meters. Kilometers are used for road distances in most countries.",
  },

  // Additional Volume
  {
    fromSlug: "oz-fl", toSlug: "ml", fromUnit: "Fluid Ounce", toUnit: "Milliliter",
    fromSymbol: "fl oz", toSymbol: "mL", category: "Volume",
    convert: (v) => v * 29.5735,
    formula: "multiply by 29.5735",
    explanation: "One US fluid ounce equals approximately 29.57 milliliters. This is essential for cooking and beverage measurements.",
  },
  {
    fromSlug: "ml", toSlug: "oz-fl", fromUnit: "Milliliter", toUnit: "Fluid Ounce",
    fromSymbol: "mL", toSymbol: "fl oz", category: "Volume",
    convert: (v) => v * 0.033814,
    formula: "multiply by 0.033814",
    explanation: "One milliliter equals approximately 0.034 US fluid ounces. Useful for converting metric recipes to US measurements.",
  },
];

export const popularValues = [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 100, 200, 500, 1000];

export function findPair(fromSlug: string, toSlug: string): ConversionPair | undefined {
  return conversionPairs.find((p) => p.fromSlug === fromSlug && p.toSlug === toSlug);
}

export function parseConversionSlug(slug: string): { value: number; pair: ConversionPair } | null {
  for (const pair of conversionPairs) {
    const pattern = `^(\\d+(?:\\.\\d+)?)-${pair.fromSlug}-to-${pair.toSlug}$`;
    const match = slug.match(new RegExp(pattern));
    if (match) {
      return { value: parseFloat(match[1]), pair };
    }
  }
  return null;
}

export function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString("en-US");
  if (Math.abs(n) < 0.001) return n.toExponential(4);
  if (Math.abs(n) < 1) return n.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
  if (Math.abs(n) < 100) return n.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function generateAllConversionSlugs(): string[] {
  const slugs: string[] = [];
  for (const pair of conversionPairs) {
    for (const value of popularValues) {
      slugs.push(`${value}-${pair.fromSlug}-to-${pair.toSlug}`);
    }
  }
  return slugs;
}

export function getRelatedConversions(currentPair: ConversionPair, currentValue: number): { slug: string; label: string }[] {
  const related: { slug: string; label: string }[] = [];
  const sameCategory = conversionPairs.filter(
    (p) => p.category === currentPair.category && p !== currentPair
  );
  for (const p of sameCategory.slice(0, 4)) {
    related.push({
      slug: `${currentValue}-${p.fromSlug}-to-${p.toSlug}`,
      label: `${currentValue} ${p.fromUnit} to ${p.toUnit}`,
    });
  }
  const otherValues = popularValues.filter((v) => v !== currentValue).slice(0, 4);
  for (const v of otherValues) {
    related.push({
      slug: `${v}-${currentPair.fromSlug}-to-${currentPair.toSlug}`,
      label: `${v} ${currentPair.fromUnit} to ${currentPair.toUnit}`,
    });
  }
  return related;
}

export function getQuickTable(pair: ConversionPair): { value: number; result: string }[] {
  return [1, 2, 5, 10, 20, 50, 100, 500, 1000].map((v) => ({
    value: v,
    result: formatNumber(pair.convert(v)),
  }));
}
