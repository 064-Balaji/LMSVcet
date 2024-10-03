import { Card, Flex, Heading, Tabs, Text, TextField } from "@radix-ui/themes";
import { FileDigit, Key, User } from "lucide-react";
import SignUpComp from "./SignUpComp";

const page = () => {
  return (
    <Flex justify="center" align="center" className="min-h-svh py-4">
      <Card>
        <Flex
          justify="between"
          direction="column"
          align="center"
          className="gap-3 p-4"
        >
          <Heading>Student Login</Heading>
          <Tabs.Root className="flex flex-col gap-4 items-center">
            <Tabs.List className="flex">
              <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
              <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="signup" className="w-[40rem]">
              <SignUpComp />
            </Tabs.Content>
            <Tabs.Content value="signin">
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
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Card>
    </Flex>
  );
};

export default page;
