"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInButton({ text }: { text: string }) {
  return (
    <Button onClick={() => signIn("google").catch(console.error)}>
      {text}
    </Button>
  );
}
