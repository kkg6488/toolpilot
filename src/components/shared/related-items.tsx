import Link from "next/link";
import type { RelatedItem } from "@/lib/related-items";

export function RelatedSection({
  title = "Related tools & calculators",
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="mt-10" aria-labelledby="related-section-heading">
      <h2
        id="related-section-heading"
        className="text-xl font-semibold text-foreground"
      >
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
            >
              <span className="font-medium text-foreground group-hover:text-primary">
                {item.label}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
