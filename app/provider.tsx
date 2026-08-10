import { GoogleOAuthProvider } from "@react-oauth/google";
import ReduxProvider from "./redux/ReduxProvider";
import AuthInitializer from "./AuthInitializer";

import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <ReduxProvider>
        <AuthInitializer />
        {children}
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}
