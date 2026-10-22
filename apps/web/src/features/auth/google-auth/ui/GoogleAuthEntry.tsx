"use client";

import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@shop/ui";

import { useGoogleAuth } from "../model/hooks/useGoogleAuth";

export const GoogleAuthEntry = () => {
  const { handleGoogleAuth } = useGoogleAuth();

  return (
    <Button variant="outline" type="button" onClick={handleGoogleAuth}>
      <RiGoogleFill className="size-5" />
      Sign up with Google
    </Button>
  );
};
