import type { Route } from "./+types/productDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product details - Aliphone" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  return <h1>Product Details</h1>;
}
