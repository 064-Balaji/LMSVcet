import React from "react";
import SignUpComp from "./SignUpComp";
import SignInComp from "./SignInComp";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full border-none shadow-xl max-w-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center  pb-4">
            Staff Portal
          </h1>
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
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
