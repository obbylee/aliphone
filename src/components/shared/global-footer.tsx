"use client";

import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 text-center">
      <div className="container mx-auto px-4">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} Aliphone. All rights reserved.
        </p>
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
