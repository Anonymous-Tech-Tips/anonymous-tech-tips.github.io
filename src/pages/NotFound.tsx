import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Enhanced development logging for debugging
    if (import.meta.env.DEV) {
      console.groupCollapsed(
        `%c[404] Route not found`,
        "color:#f87171;font-weight:bold"
      );
      console.error("HashRouter path:", location.pathname + location.search + location.hash);
      console.info("Window URL:", window.location.href);
      console.info("BASE_URL:", import.meta.env.BASE_URL);
      console.info("Hash:", location.hash);
      console.info("Search params:", location.search);
      console.info("State:", location.state);
      console.groupEnd();

      // Also log to help identify routing issues
      console.warn(
        `🔍 404 Debug Info: Check if this route exists in your router configuration. Current path: ${location.pathname}`
      );
    } else {
      // Production logging (less verbose)
      console.error("404 Error: Route not found:", location.pathname);
    }
  }, [location.pathname, location.search, location.hash, location.state]);

  return (
    <>
      <SEO
        title="404 - Page Not Found | Armaan's Tech Tips"
        description="The page you're looking for doesn't exist. Return to Armaan's Tech Tips for gaming, utilities, and tech resources."
      />
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
            <p className="mb-4 text-xl text-muted-foreground">
              Oops! Page not found
              {import.meta.env.DEV && (
                <span className="block text-sm text-muted-foreground mt-2">
                  Check the console for detailed routing diagnostics
                </span>
              )}
            </p>
            <Link to="/" className="text-primary underline hover:text-primary/80">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
