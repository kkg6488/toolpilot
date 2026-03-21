import Link from "next/link";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-pretty text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-8")}
      >
        Back to home
      </Link>
    </div>
  );
}
