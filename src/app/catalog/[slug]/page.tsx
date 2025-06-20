import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { caller } from "@/server";
import AddToCartForm from "@/components/add-to-cart-form";

type Params = Promise<{ slug: string }>;

export default async function Page(props: { params: Params }) {
  const { slug } = await props.params;
  const product = await caller.products.getBySlug(decodeURIComponent(slug));

  if (!product) {
    return <h3 className="text-lg">No product available.</h3>;
  }

  return (
    <main className="w-full">
      <section className="mx-auto max-w-[1200px] p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="flel flex-col md:grid md:grid-cols-12 border p-2 gap-2 rounded-md h-[300px] md:h-[400px]">
          <div className="hidden md:flex md:flex-col gap-4 md:col-span-2 items-center">
            <div className="bg-gray-100 dark:bg-gray-500 rounded-md h-20 w-20 overflow-hidden">
              <img
                alt={product?.name}
                src={product?.imageUrl ?? "null"}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-gray-100 dark:bg-gray-500 rounded-md h-20 w-20" />

            <div className="bg-gray-100 dark:bg-gray-500 rounded-md h-20 w-20" />
          </div>

          <div className="bg-gray-100 dark:bg-gray-500 rounded-md h-[280px] md:h-[380px] md:col-span-10 overflow-hidden">
            <img
              alt={product?.name}
              src={product?.imageUrl || "null"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <AddToCartForm
          initialProduct={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: Number(product.price),
            minimumOrderQuantity: product.minimumOrderQuantity,
            stockQuantity: product.stockQuantity,
          }}
        />
      </section>

      <section className="mx-auto max-w-[1200px] px-4">
        <div className="border rounded-md p-4 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-full h-15 w-15">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>IM</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col justify-center items-start">
                <div className="self-start flex gap-2 justify-center items-center">
                  <Label>Super Chad Mall</Label>
                  <CheckCircle size={15} />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4 mt-2">
                  <span className="text-xs">Jakarta, Indonesia</span>
                  <span className="text-xs">Transaction success: 98%</span>
                </div>
              </div>
            </div>

            <Button className="outline hidden md:block">Visit store</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] p-4">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="min-h-[200px] p-4 border">
            {product?.description}
          </TabsContent>
          <TabsContent value="reviews" className="min-h-[400px] p-4 border">
            User reviews.
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
