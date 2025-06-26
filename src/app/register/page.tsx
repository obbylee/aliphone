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
import Image from "next/image";

const formRegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field is required.")
      .email("This is not a valid email."),
    password: z.string().min(8, "Password must be atleast 8 characters long."),
    confirmPassword: z.string(),
    name: z.string().min(1, "This field is required."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will associate the error with the confirmPassword field
  });

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formRegisterSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        image:
          "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${response.name}&size=64",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/", { scroll: false });
        },
        onError: ctx => {
          // display the error message
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
    return;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Aliphone.com
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                autoComplete="off"
              >
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="confirm password ..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Re-enter your password to confirm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="enter name ..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Your display name for the platform.
                      </FormDescription>
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
                    <span>Submit</span>
                  )}
                </Button>

                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block h-full w-full">
        <Image
          src="https://img.freepik.com/free-photo/smartphones-shopping-bags_23-2147957620.jpg?ga=GA1.1.670213319.1722347658&semt=ais_hybrid&w=740"
          alt="Image"
          className="absolute inset-0 object-cover"
          fill
        />
      </div>
    </div>
  );
}
