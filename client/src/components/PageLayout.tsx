/*
 * PageLayout — wraps every page with Navigation + Footer
 * Ensures consistent structure across all routes.
 */

import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main className="pt-14 md:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
