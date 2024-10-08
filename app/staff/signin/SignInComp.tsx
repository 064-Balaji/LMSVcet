"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    setIsSubmitting(true);
    try {
      await signIn("credentials", {
        email,
        password,
        type: "staff",
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-8 space-y-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center ">
        Welcome Back
      </h2>
      <p className="text-sm text-center">
        Sign in to your account to access the platform
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium ">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium ">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Sign In Button */}
        <Button type="submit" className="w-full dark:bg-slate-400 py-2 rounded-md flex items-center justify-center transition duration-300 ease-in-out">
        {isSubmitting ?
              <BeatLoader size={10} color="white"/>
              :
              <>
                SignIn <LogIn className="ml-2 h-4 w-4" />
              </>
            }
        </Button>
      </form>

      {/* Additional Links */}
      <div className="text-center">
        <a href="#" className="text-sm text-indigo-600 hover:underline">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default SignInComp;
