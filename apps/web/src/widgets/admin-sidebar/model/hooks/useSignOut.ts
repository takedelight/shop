"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/shared/auth";

export const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Не вдалося вийти:", error.message);
      return;
    }

    router.push("/auth/login");
  };

  return {
    handleSignOut,
  };
};
