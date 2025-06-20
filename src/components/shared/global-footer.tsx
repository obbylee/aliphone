export default function GlobalFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 text-center">
      <div className="container mx-auto px-4">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} Aliphone. All rights reserved.
        </p>
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a href="/" className="hover:text-primary transition-colors">
            About Us
          </a>
          <a href="/" className="hover:text-primary transition-colors">
            Contact
          </a>
          <a href="/" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
}
