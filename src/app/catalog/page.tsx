import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { caller } from "@/server";
import { formatCurrency } from "@/utils/formatCurrency";
import { parseNumberParam } from "@/utils/parseNumber";
import Link from "next/link";

type SearchParams = Promise<{
  query?: string;
  category?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  minOrder?: string;
}>;

export default async function CatalogPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;
  const minPrice = searchParams.minPrice;
  const maxPrice = searchParams.maxPrice;
  const minOrder = searchParams.minOrder;
  const category = searchParams.category;

  const categories = await caller.getCategories();

  const payload = {
    key: query,
    minPrice: parseNumberParam(minPrice),
    maxPrice: parseNumberParam(maxPrice),
    minOrder: parseNumberParam(minOrder),
    categories: Array.isArray(category) ? category : category ? [category] : [],
  };

  const products = await caller.products.catalog(payload);

  return (
    <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 p-4">
      <aside className="bg-gray-50 dark:bg-black dark:border-gray-500 rounded-md p-6 border md:max-h-[490px] md:sticky md:top-20">
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>

        <form action="/catalog" autoComplete="off">
          <div className="mb-4">
            <Label className="mb-2">Keywords</Label>
            <div className="flex items-center">
              <Input
                type="text"
                name="query"
                placeholder="keywords"
                defaultValue={query}
              />
            </div>
          </div>

          <div className="mb-4">
            <Label className="mb-4">Categories</Label>
            <div className="flex flex-col items-start gap-3">
              {categories &&
                categories.map(category => (
                  <div key={category.id} className="flex items-center gap-3">
                    <Checkbox name="category" value={category.id} />
                    <Label className="font-medium">{category.name}</Label>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <Label className="mb-2">Price Range:</Label>
            <div className="flex items-center">
              <Input type="number" name="minPrice" min={1} placeholder="min" />
              <span className="text-gray-500">-</span>
              <Input type="number" name="maxPrice" min={1} placeholder="max" />
            </div>
          </div>

          <div className="mb-4">
            <Label className="mb-2">Min. Order</Label>
            <div className="flex items-center">
              <Input
                type="number"
                name="minOrder"
                min={1}
                placeholder="min order"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <Button type="submit" variant="outline">
              Apply filters
            </Button>

            <Button variant="outline" asChild>
              <Link href="/catalog">Reset filters</Link>
            </Button>
          </div>
        </form>
      </aside>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products && products.length > 0 ? (
          products.map(product => (
            <Link
              key={product.sku}
              href={`/catalog/${encodeURIComponent(product.slug)}`}
              scroll={false}
            >
              <div className="bg-white dark:bg-black min-h-[490px] border border-gray-200 dark:border-gray-500 rounded-md p-4 shadow-sm">
                <div className="bg-gray-100 rounded-md h-64">
                  <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg md:text-xl truncate my-4">
                  <span>{product.slug}</span>
                  <span className="block">{product.name}</span>
                </h3>
                <h1 className="text-xl">
                  {formatCurrency(Number(product.price))}
                </h1>
                <h2 className="text-lg">
                  Min. order: {product.minimumOrderQuantity} pieces
                </h2>
                <span className="text-sm">
                  Stock Quantity: {product.stockQuantity}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <Button className="flex-1" variant="outline">
                    Check details
                  </Button>
                  <Button className="flex-1" variant="secondary">
                    Add to cart
                  </Button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h3 className="text-lg"> No product available.</h3>
        )}
      </main>
    </div>
  );
}
