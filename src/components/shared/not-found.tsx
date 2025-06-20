import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4 text-center">
      <h1 className="text-7xl font-bold tracking-wider">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="text-muted-foreground mt-2 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button asChild variant="outline" className="mt-6">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
