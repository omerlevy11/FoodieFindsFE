import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="822580133929-qvu00mf93t8l72nkdh071vm6hptmgqf9.apps.googleusercontent.com">
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
