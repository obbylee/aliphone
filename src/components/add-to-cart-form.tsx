"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { Heart, Loader2, MessageCircle, Recycle } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

type CartFormValues = {
  productId: string;
  minOrder: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  minimumOrderQuantity: number;
  stockQuantity: number;
};

export default function AddToCartForm({
  initialProduct,
}: {
  initialProduct: Product;
}) {
  const form = useForm<CartFormValues>({
    defaultValues: {
      productId: initialProduct.id,
      minOrder: initialProduct.minimumOrderQuantity,
    },
    mode: "onChange", // Or "onBlur", helps revalidate
  });

  const trpcCartOptions = trpc.cart.addToCart.mutationOptions({
    onSuccess: values => {
      toast.info(values.message);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  const { mutate, isPending } = useMutation(trpcCartOptions);

  async function onSubmit(values: CartFormValues) {
    const payload = {
      productId: values.productId,
      quantity: values.minOrder,
    };
    mutate(payload);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[400px]">
        <h1 className="text-lg md:text-2xl">{initialProduct.slug}</h1>
        <h2 className="text-sm md:text-lg my-4 bg-gray-100 dark:bg-gray-500 px-2.5 py-2 rounded-sm">
          {initialProduct.name}
        </h2>

        <h1 className="text-lg md:text-3xl mb-4">
          {formatCurrency(Number(initialProduct.price))}
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <div className="flex gap-4">
            <Label className="text-sm md:text-md">
              Stock quantity: {initialProduct.stockQuantity}
            </Label>
            <Label className="text-sm md:text-md">
              Min Order. {initialProduct.minimumOrderQuantity} Pieces
            </Label>
          </div>

          <FormField
            control={form.control}
            name="minOrder"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Minimum ${initialProduct.minimumOrderQuantity} orders`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Button
            className="w-full py-5 text-md md:text-lg"
            size="lg"
            disabled={true}
          >
            Buy this item
          </Button>
          <Button
            type="submit"
            className="w-full py-5 text-md md:text-lg"
            variant="outline"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Please wait</span>
              </>
            ) : (
              <span>Add to cart</span>
            )}
          </Button>
        </div>

        <div className="flex justify-around items-center p-2">
          <h4 className="flex gap-2 justify-center items-center text-sm">
            <MessageCircle size={15} />
            <span>Chat</span>
          </h4>
          <h4 className="flex gap-2 justify-center items-center text-sm">
            <Heart size={15} />
            <span>Whislist</span>
          </h4>
          <h4 className="flex gap-2 justify-center items-center text-sm">
            <Recycle size={15} />
            <span> Share</span>
          </h4>
        </div>
      </form>
    </Form>
  );
}
