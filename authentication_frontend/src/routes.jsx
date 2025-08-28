import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// PUBLIC_INTERFACE
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "signin", element: <Signin /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);
