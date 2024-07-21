import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider>
          <StrictMode></StrictMode>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
