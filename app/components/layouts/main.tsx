import type { Route } from "./+types/main";
import { NavLink, Outlet } from "react-router";

export default function Route() {
  return (
    <>
      <header className="mx-auto max-w-[1200px] flex justify-between items-center bg-white sticky top-0">
        <a href="/" className="p-4 font-medium text-2xl">
          Aliphone.com
        </a>
        <nav className="flex justify-center items-center gap-4">
          <NavLink to="about">About</NavLink>
          <NavLink to="product">Product</NavLink>
          <a>Admin</a>
          <NavLink
            to="/login"
            className="py-2 px-6 w-auto border rounded-md hover:bg-gray-100"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="py-2 px-6 w-auto rounded-md bg-black text-white hover:bg-gray-100 hover:text-black hover:border-gray-300"
          >
            Register
          </NavLink>
          <a>Cart</a>
        </nav>
      </header>

      <Outlet />

      <footer className="container bg-white fixed bottom-0 text-center">
        Aliphone.com &copy; 2025
      </footer>
    </>
  );
}
