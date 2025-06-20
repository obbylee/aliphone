"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">Something went wrong.</h1>
      <p className="text-sm text-muted-foreground mb-6">
        We’re sorry for the inconvenience. Please try again or go back.
      </p>
      <Button variant="outline" onClick={() => reset()}>
        Try Again
      </Button>
    </main>
  );
}
