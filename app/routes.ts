import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("components/layouts/main.tsx", [
    index("routes/onboard.tsx"),
    route("login", "./routes/login.tsx"),
    route("register", "./routes/register.tsx"),
    route("about", "./routes/about.tsx"),
    route("product", "./routes/product.tsx"),
    route("product/:slug", "./routes/productDetails.tsx"),
  ]),
] satisfies RouteConfig;
