import { TextField } from "@radix-ui/themes";
import { User, Key } from "lucide-react";
import React from "react";

const SignInComp = () => {
  return (
    <form action="" className="w-[400px] flex flex-col gap-3">
      <TextField.Root placeholder="username">
        <TextField.Slot>
          <User />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="********">
        <TextField.Slot>
          <Key />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SignInComp;
