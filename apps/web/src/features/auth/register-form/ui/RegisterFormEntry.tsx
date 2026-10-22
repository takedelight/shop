import { Button, Field, FieldDescription, FieldLabel, Input } from "@shop/ui";

export const RegisterFormEntry = () => {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input id="name" type="text" placeholder="John Doe" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
        <FieldDescription>
          We&apos;ll use this to contact you. We will not share your email with anyone else.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" required />
        <FieldDescription>Must be at least 8 characters long.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
        <Input id="confirm-password" type="password" required />
        <FieldDescription>Please confirm your password.</FieldDescription>
      </Field>
      <Field>
        <Button type="submit">Create Account</Button>
      </Field>
    </>
  );
};
