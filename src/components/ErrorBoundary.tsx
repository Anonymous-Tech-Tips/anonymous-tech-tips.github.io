import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, copied: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });

    // Enhanced logging for development
    if (import.meta.env.DEV) {
      console.groupCollapsed(
        `%c[ErrorBoundary] Application Error`,
        "color:#dc2626;font-weight:bold"
      );
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
      console.info("Stack trace:", error.stack);
      console.groupEnd();
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, copied: false });
    window.location.href = "/Armaan-Tech-Tips/";
  };

  private handleReload = () => {
    window.location.reload();
  };

  private copyErrorDetails = async () => {
    if (!this.state.error || !this.state.errorInfo) return;

    const errorDetails = {
      timestamp: new Date().toISOString(),
      error: {
        message: this.state.error.message,
        name: this.state.error.name,
        stack: this.state.error.stack,
      },
      errorInfo: {
        componentStack: this.state.errorInfo.componentStack,
      },
      url: window.location.href,
      userAgent: navigator.userAgent,
      environment: import.meta.env.MODE,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (err) {
      console.error("Failed to copy error details:", err);
      // Fallback: try to copy just the error message
      try {
        await navigator.clipboard.writeText(this.state.error.message);
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy even error message:", fallbackErr);
      }
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-6">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>
            </div>

            {this.state.error && (
              <details className="text-left bg-muted p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
                  Technical Details
                </summary>
                <div className="space-y-3">
                  <div className="bg-background p-3 rounded border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Error Message:</h4>
                    <pre className="text-xs text-destructive overflow-auto">
                      {this.state.error.message}
                    </pre>
                  </div>

                  {this.state.errorInfo && (
                    <div className="bg-background p-3 rounded border">
                      <h4 className="text-sm font-medium text-foreground mb-2">Component Stack:</h4>
                      <pre className="text-xs text-muted-foreground overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  {import.meta.env.DEV && (
                    <div className="flex justify-center">
                      <Button
                        onClick={this.copyErrorDetails}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {this.state.copied ? (
                          <>
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-3 w-3" />
                            Copy Error Details (QA)
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReload} variant="default">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload Page
              </Button>
              <Button onClick={this.handleReset} variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              If the problem persists, please{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                report this issue
              </a>
              {import.meta.env.DEV && " or check the console for detailed error logs"}.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
