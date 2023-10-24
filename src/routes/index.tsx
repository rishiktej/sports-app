import { createBrowserRouter, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
// import NotFound from "../pages/Notfound";
import Home from "../pages/landingpage";
import React from "react";
import MatchList from "../pages/landingpage/Livematch";
import ArticleList from "../pages/landingpage/news";
import ArticleDialog from "../pages/landingpage/modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/account/Home" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // {
  //   path: "/notfound",
  //   element: <NotFound />,
  // },
  // {
  //   path: "*",
  //   element: <Navigate to="/notfound" replace />,
  // },
  // Protected Routes
  {
    path: "account",
    element: <AccountLayout />,
    children: [
      { index: true, element: <Navigate to="/account/Home" replace /> },
      {
        path: "Home",
        element: <MatchList />,
      },
      {
        path: "Home/:articleId",
        element: <ArticleDialog />,
      },
    ],
  },
]);

export default router;
