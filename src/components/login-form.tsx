"use client";

import type React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const currentYear = new Date().getFullYear();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleSignIn = async () => {
    try {
      toast.loading("Redirecting to Google...", { id: "google-signin" });

      await signIn("google", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in. Please try again.", {
        id: "google-signin",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative bg-muted rounded-lg md:hidden rounded-b-none">
              <img
                src="/undraw_secure-login_m11a.svg"
                alt="Mobile login illustration"
                className="inset-0 h-48 w-full object-contain p-8 dark:brightness-[0.8] dark:grayscale"
              />
            </div>
          <form
            className="p-6 md:p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleGoogleSignIn();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your Word Wheel account with Google
                </p>
              </div>
              <Button type="submit" className="w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/undraw_secure-login_m11a.svg"
              alt="Mobile login illustration"
              className="absolute inset-0 h-full w-full object-contain p-8 dark:brightness-[0.8] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        © {currentYear} Word Wheel. All rights reserved.
      </div>
    </div>
  );
}
