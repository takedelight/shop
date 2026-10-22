"use client";

import { Field, FieldDescription, FieldSeparator } from "@shop/ui";

import { GoogleAuthEntry } from "@/features/auth/google-auth";
import { RegisterFormEntry } from "@/features/auth/register-form";

import { Register } from "./Register";

export const RegisterEntry = () => {
  return (
    <Register>
      <Register.Header>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
      </Register.Header>

      <Register.Content>
        <RegisterFormEntry />
      </Register.Content>

      <FieldSeparator>Or continue with</FieldSeparator>

      <Register.Footer>
        <Field>
          <GoogleAuthEntry />
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>
      </Register.Footer>
    </Register>
  );
};
