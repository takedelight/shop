"use client";

import { authClient } from "@/shared/auth";

export const useGoogleAuth = () => {
  const handleGoogleAuth = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google auth failed:", error.message);
    }
  };

  return {
    handleGoogleAuth,
  };
};
