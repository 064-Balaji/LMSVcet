"use client";

import { Button, TextField } from "@radix-ui/themes";
import { User, Key, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(email, pass);
        await signIn("credentials", {
          email: email,
          password: pass,
          type: "student",
          redirectTo: "/",
        });
      }}
      className="w-[400px] flex flex-col gap-3"
    >
      <TextField.Root
        placeholder="username"
        onChange={(v) => setEmail(v.target.value)}
        value={email}
        type="email"
      >
        <TextField.Slot>
          <User />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        placeholder="********"
        type="password"
        onChange={(v) => setPass(v.target.value)}
      >
        <TextField.Slot>
          <Key />
        </TextField.Slot>
      </TextField.Root>
      <Button>
        Login
        <LogIn />
      </Button>
    </form>
  );
};

export default SignInComp;
