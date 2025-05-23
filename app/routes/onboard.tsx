import type { Route } from "./+types/onboard";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { trpc } from "~/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onboard - Aliphone" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const res = await trpc.hello.query();
  console.log(res);
  return [];
}

export default function Route({ loaderData }: Route.ComponentProps) {
  return (
    <main className="py-24 md:py-36 h-screen">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight">
          The Ultimate Source for Wholesale Phones
        </h1>
        <p className="text-lg sm:text-xl mb-10 md:mb-12 max-w-3xl mx-auto text-gray-500">
          Streamline your procurement process. Connect with verified suppliers
          and get the best deals on bulk phone orders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Search for phone models, brands, or suppliers..."
            className="w-full sm:w-auto sm:flex-1 text-black rounded"
          />
          <Button variant="default" size="default">
            <Search className="w-5 h-5 mr-2" />
            <span>Find Deals</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
