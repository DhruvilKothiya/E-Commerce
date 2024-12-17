import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./Layout"; // Import the Layout component
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import { info } from "./TokenGet";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = info;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const UnauthenticatedRoute = ({ children }) => {
  const isAuthenticated = info;
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: (  
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <HomeScreen /> },
        { path: "products/:id", element: <ProductScreen /> },
        { path: "cart/:id?", element: <CartScreen /> },
      ],
    },
    {
      path: "login",
      element: (
        <UnauthenticatedRoute>
          <LoginScreen />
        </UnauthenticatedRoute>
      ),
    },
    {
      path: "signup",
      element: (
        <UnauthenticatedRoute>
          <SignupScreen />
        </UnauthenticatedRoute>
      ),
    },
    {
      path: "reset-password/:uidb64/:token",
      element: (
        <UnauthenticatedRoute>
          <ResetPasswordScreen />
        </UnauthenticatedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return routes;
};

export default AppRoutes;