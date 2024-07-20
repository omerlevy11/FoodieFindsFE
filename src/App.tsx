import { StrictMode } from "react";
import ReactDOM from "react-dom/client";


import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="409999073428-49khbidla0mq2rb119am8m0amua8jlml.apps.googleusercontent.com">
          <StrictMode>
          </StrictMode>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
