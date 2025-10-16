import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
            <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
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
