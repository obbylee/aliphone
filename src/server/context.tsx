import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  return {
    prisma,
    session,
    req: opts?.req,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
