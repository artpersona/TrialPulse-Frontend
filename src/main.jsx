import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { FirebaseContextProvider } from "./contexts/FirebaseContext.jsx";
import { MessagingProvider } from "./contexts/MessagingContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseContextProvider>
        <AuthContextProvider>
          <MessagingProvider>
            <>
              <Toaster />
              <App />
            </>
          </MessagingProvider>
        </AuthContextProvider>
      </FirebaseContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
