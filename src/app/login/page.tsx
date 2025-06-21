"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required.")
    .email("This is not a valid email."),
  password: z.string().min(8, "Password must be atleast 8 characters long."),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    const result = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: ctx => {
          setIsLoading(true);
        },
        onSuccess: ctx => {
          router.push("/", { scroll: false });
        },
        onError: ctx => {
          // display the error message
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Aliphone.com
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                autoComplete="off"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="enter email ..." {...field} />
                      </FormControl>
                      <FormDescription>Your email address.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="enter password ..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Minimum 8 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Please wait</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://img.freepik.com/free-photo/3d-illustration-smartphone-with-blank-white-screen-cardboard-boxes-e-commerce-shipping-service-concept_58466-14530.jpg?ga=GA1.1.670213319.1722347658&semt=ais_hybrid&w=740"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
