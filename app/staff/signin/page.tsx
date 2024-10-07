import React from "react";
import SignUpComp from "./SignUpComp";
import SignInComp from "./SignInComp";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
            Staff Portal
          </h1>
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInComp />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpComp />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default Page;
