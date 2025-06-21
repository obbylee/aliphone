"use client";

import { type Product, columns } from "./columns";
import { type CreateProductFormValues, ManageProduct } from "./manage-product";
import { DataTable } from "./data-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useQueries } from "@tanstack/react-query";
import Loader from "@/components/shared/loader";

export default function ProductPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<CreateProductFormValues | null>(null);

  const productQueryOptions = trpc.admin.product.list.queryOptions();
  const categoryQueryOptions = trpc.getCategories.queryOptions();

  const [productsQuery, categoriesQuery] = useQueries({
    queries: [productQueryOptions, categoryQueryOptions],
  });

  const normalizedData: Product[] = (productsQuery.data || []).map(item => ({
    ...item,
    imageUrl: item.imageUrl ?? undefined,
    stockQuantity: item.stockQuantity?.toString() ?? undefined,
    minimumOrderQuantity: item.minimumOrderQuantity?.toString() ?? undefined,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
    categoryId: item.categoryId ?? undefined,
  }));

  const handleEditProduct = (product: CreateProductFormValues) => {
    // Map the fetched Product data to the form's expected input type
    const formData: CreateProductFormValues = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      slug: product.slug,
      description: product.description ?? "",
      price: product.price,
      imageUrl: product.imageUrl ?? "",
      stockQuantity: product.stockQuantity ?? 0,
      minimumOrderQuantity: product.minimumOrderQuantity ?? 1,
      categoryId: product.categoryId ?? undefined,
    };
    setSelectedProduct(formData);
    setIsDialogOpen(true);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleFormCancel = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  if (productsQuery.isPending || categoriesQuery.isPending) {
    return <Loader />;
  }

  return (
    <div className="py-6">
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateProduct}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>

          <ManageProduct
            initialData={selectedProduct}
            categories={categoriesQuery.data || []}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={normalizedData}
        tableOptions={{
          meta: {
            onEdit: handleEditProduct, // This is the function called by the Action button
          },
        }}
      />
    </div>
  );
}
