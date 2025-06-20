"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import HeaderUser from "./header-user";
import { authClient } from "@/lib/auth-client";

export default function GlobalHeader() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="z-20 mx-auto max-w-[1200px] flex justify-between items-center bg-white dark:bg-black sticky top-0">
      <a href="/" className="p-4 font-medium text-xl sm:text-2xl">
        Aliphone.com
      </a>
      <nav className="flex justify-center items-center gap-4 p-4">
        <Link href="/catalog" scroll={false} className="font-medium text-lg">
          Product
        </Link>

        {isPending ? (
          <span>Loading...</span>
        ) : !session && !isPending ? (
          <>
            <div className="hidden md:flex md:gap-2">
              <Button size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>

            <div className="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <HeaderUser
            user={{
              name: session?.user.name as string,
              email: session?.user.email as string,
              avatar: session?.user.image as string,
            }}
          />
        )}
      </nav>
    </header>
  );
}
