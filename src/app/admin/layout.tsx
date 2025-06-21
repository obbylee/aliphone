"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loader from "@/components/shared/loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: session?.user.name ?? "",
          email: session?.user.email ?? "",
          avatar: session?.user.image ?? "",
        }}
      />
      <main className="w-full p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
