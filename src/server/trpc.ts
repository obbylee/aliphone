import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(opts => {
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      cause: "No session",
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      session: opts.ctx.session,
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
