import { createBrowserRouter, Navigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import AccountLayout from "../layouts/account";
// import ProtectedRoute from "./ProtectedRoute";
// import Signin from "../pages/signin";
// import Signup from "../pages/signup";
// import Logout from "../pages/logout";
// import NotFound from "../pages/Notfound";
import Home from "../pages/landingpage";
import React from "react";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // {
  //   path: "/",
  //   element: <Signin />,
  // },
  // {
  //   path: "/logout",
  //   element: <Logout />,
  // },
  // {
  //   path: "/notfound",
  //   element: <NotFound />,
  // },
  // {
  //   path: "*",
  //   element: <Navigate to="/notfound" replace />,
  // },
  // Protected Routes
  // {
  //   path: "account",
  //   element: (
  //     <ProtectedRoute>
  //       <AccountLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { index: true, element: <Navigate to="/account/projects" replace /> },
  //     {
  //       path: "projects",
  //       element: <ProjectContainer />,
  //       children: [
  //         { index: true, element: <Projects /> },
  //         {
  //           path: ":projectID",
  //           element: <ProjectDetails />,
  //           children: [
  //             { index: true, element: <></> },
  //             {
  //               path: "tasks",
  //               children: [
  //                 { index: true, element: <Navigate to="../" /> },
  //                 {
  //                   path: "new",
  //                   element: <NewTask />,
  //                 },
  //                 {
  //                   path: ":taskID",
  //                   children: [
  //                     { index: true, element: <TaskDetailsContainer /> },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: "members",
  //       element: <Members />,
  //     },
  //   ],
  // },
]);

export default router;
