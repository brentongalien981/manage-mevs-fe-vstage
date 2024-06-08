import React from "react";
import { lazy } from "@loadable/component";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
const Home = lazy(() => import("./pages/home"));
const DailySummary = lazy(() => import("./pages/daily-summary"));
const Orders = lazy(() => import("./pages/orders"));
const Returns = lazy(() => import("./pages/returns"));

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "daily-summary", element: <DailySummary /> },
      { path: "orders", element: <Orders /> },
      { path: "returns", element: <Returns /> },
    ],
  },
];

export default routes;
