import prisma from "@/lib/prisma";
import {
  createCallerFactory,
  publicProcedure,
  router,
  protectedProcedure,
} from "./trpc";
import { z } from "zod";
import { Context } from "./context";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  getCategories: publicProcedure.query(async () => {
    return await prisma.productCategory.findMany();
  }),
  products: {
    catalog: publicProcedure
      .input(
        z.object({
          key: z.string().nullish(),
          minPrice: z.number().nullish(),
          maxPrice: z.number().nullish(),
          minOrder: z.number().nullish(),
          categories: z.array(z.string().nullish()),
        })
      )
      .query(async ({ input }) => {
        const whereConditions = {};
        if (input.key) {
          Object.assign(whereConditions, {
            OR: [
              { slug: { contains: input.key, mode: "insensitive" } },
              { name: { contains: input.key, mode: "insensitive" } },
              { description: { contains: input.key, mode: "insensitive" } },
            ],
          });
        }

        if (input.minPrice) {
          Object.assign(whereConditions, { price: { gte: input.minPrice } });
        }

        if (input.maxPrice) {
          Object.assign(whereConditions, { price: { lte: input.maxPrice } });
        }

        if (input.minOrder) {
          Object.assign(whereConditions, {
            minimumOrderQuantity: { gte: input.minOrder },
          });
        }

        if (input.categories && input.categories.length > 0) {
          Object.assign(whereConditions, {
            categoryId: {
              in: input.categories,
            },
          });
        }

        const products = await prisma.product.findMany({
          where: whereConditions,
        });

        return products;
      }),
    getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
      const product = await prisma.product.findFirst({
        where: { OR: [{ slug: input }, { name: input }] },
      });
      return product;
    }),
  },
  cart: {
    getCart: protectedProcedure.query(async ({ ctx }) => {
      const cart = await prisma.cart.findUnique({
        where: { userId: ctx.session.user.id },
        include: {
          items: {
            include: {
              product: {
                // Include product details for each item in the cart
                select: {
                  id: true,
                  name: true,
                  sku: true,
                  price: true,
                  imageUrl: true,
                  stockQuantity: true,
                  minimumOrderQuantity: true,
                },
              },
            },
          },
        },
      });

      if (!cart) {
        return {
          id: null,
          userId: "",
          items: [],
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
        };
      }

      return cart;
    }),
    addToCart: protectedProcedure
      .input(
        z.object({
          productId: z.string(),
          quantity: z.number().int().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { productId, quantity } = input;
        const userId = ctx.session?.user?.id;

        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not logged in",
          });
        }

        // Use a transaction
        const cartOperationResult = await prisma.$transaction(async tx => {
          let cart = await tx.cart.findUnique({
            where: { userId: userId },
          });

          if (!cart) {
            const userExists = await tx.user.findUnique({
              where: { id: userId },
            });

            if (!userExists) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found.",
              });
            }
            // create cart
            cart = await tx.cart.create({
              data: { userId: userId },
            });
          }

          const product = await tx.product.findUnique({
            where: { id: productId },
          });

          if (!product) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Product not found.",
            });
          }

          if (quantity < product.minimumOrderQuantity) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Minimum order quantity for ${product.name} is ${product.minimumOrderQuantity}.`,
            });
          }
          if (product.stockQuantity < quantity) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`,
            });
          }

          const existingCartItem = await tx.cartItem.findUnique({
            where: {
              cartId_productId: { cartId: cart.id, productId: productId },
            },
          });

          let updatedCartItem;
          if (existingCartItem) {
            updatedCartItem = await tx.cartItem.update({
              where: { id: existingCartItem.id },
              data: { quantity: existingCartItem.quantity + quantity },
            });
          } else {
            updatedCartItem = await tx.cartItem.create({
              data: {
                cartId: cart.id,
                productId: productId,
                quantity: quantity,
              },
            });
          }

          await tx.product.update({
            where: { id: productId },
            data: { stockQuantity: { decrement: quantity } },
          });

          return { cart, updatedCartItem };
        });

        return {
          message: "Product added to cart successfully!",
          cartId: cartOperationResult.cart.id,
          cartItem: cartOperationResult.updatedCartItem,
        };
      }),
  },
});

export type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({} as Context);
