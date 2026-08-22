import { GoogleOAuthProvider } from "@react-oauth/google";
import ReduxProvider from "./redux/ReduxProvider";
import AuthInitializer from "./AuthInitializer";

import React from "react";

const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  process.env.GOOGLE_CLIENT_ID ||
  "967616301096-5nu5i4i5j39l3utv1kjo1phfumiovcb8.apps.googleusercontent.com";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ReduxProvider>
        <AuthInitializer />
        {children}
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}
