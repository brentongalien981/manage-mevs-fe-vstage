import React from "react";
import { lazy } from "@loadable/component";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
const Home = lazy(() => import("./pages/home"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Orders = lazy(() => import("./pages/orders"));
const Returns = lazy(() => import("./pages/returns"));
const Products = lazy(() => import("./pages/products"));
const Page404 = lazy(() => import("./pages/auth/Page404"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "returns", element: <Returns /> },
      { path: "products", element: <Products /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Page404 /> },
    ],
  },
];

export default routes;
