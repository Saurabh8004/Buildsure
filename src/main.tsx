import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ConfigError from "./components/ConfigError";
import { isSupabaseConfigured } from "./lib/supabase";

// Check configuration before rendering
const isConfigured = isSupabaseConfigured();

if (!isConfigured) {
  console.error('[ConstructBid] Supabase configuration is missing or invalid!');
  console.error('[ConstructBid] Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {!isConfigured ? (
        <ConfigError />
      ) : (
        <AuthProvider>
          <App />
        </AuthProvider>
      )}
    </ErrorBoundary>
  </React.StrictMode>
);
