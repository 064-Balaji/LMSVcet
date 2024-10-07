import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInComp from "./SignInComp";
import SignUpComp from "./SignUpComp";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl p-6 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Student Login</h1>
        <Tabs defaultValue="signup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup" className="w-full">
            <SignUpComp />
          </TabsContent>
          <TabsContent value="signin">
            <SignInComp />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Page;
