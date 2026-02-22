import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { UserPrefsProvider } from "./contexts/UserPrefsContext";
import "./index.css";

// Register service worker with aggressive auto-update
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        // Check for updates every 30 seconds
        setInterval(() => {
          registration.update();
        }, 30000);

        // Force update on new service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New service worker available, force immediate takeover
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  newWorker.postMessage({ type: 'CLIENTS_CLAIM' });

                  // Force reload after brief delay to ensure SW is ready
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                } else {
                  // First install, no need to reload
                  console.log('Service worker installed for the first time');
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('SW registration failed: ', error);
      });
  });

  // Reload page immediately when new service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
