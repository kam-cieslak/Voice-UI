import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/home";
import GamePage from "./pages/game";
import LoginPage from "./pages/login/LoginPage.tsx";
import Auth from "./layouts/Auth.tsx";
import LeadeboardPage from "./pages/leaderboard/LeadeboardPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage
      },
      {
        path: "/register",
        Component: RegisterPage
      },
      {
        path: "/game",
        Component: Auth,
        children: [
          {
            path: "/game",
            Component: GamePage
          }
        ]
      },
      {
        path: "/leaderboard",
        Component: Auth,
        children: [
          {
            path: '/leaderboard',
            Component: LeadeboardPage
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
