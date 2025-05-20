import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return { msh: "trpc response success!" };
  }),
});

export type AppRouter = typeof appRouter;
