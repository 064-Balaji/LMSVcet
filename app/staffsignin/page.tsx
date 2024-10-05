import { Flex, Card, Tabs, Heading } from "@radix-ui/themes";
import React from "react";
import SignUpComp from "./SignUpComp";
import SignInComp from "./SignInComp";

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
          <Heading>Staff Login</Heading>
          <Tabs.Root
            className="flex flex-col gap-4 items-center"
            defaultValue="signup"
          >
            <Tabs.List className="flex">
              <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
              <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="signup" className="w-[40rem]">
              <SignUpComp />
            </Tabs.Content>
            <Tabs.Content value="signin">
              <SignInComp />
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Card>
    </Flex>
  );
};

export default page;
