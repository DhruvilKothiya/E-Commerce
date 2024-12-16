// import React from "react";
import { Navigate } from "react-router-dom";
// import HomeScreen from "./Components/screens/HomeScreen";
import SignupScreen from "./Components/screens/SignupScreen";
import LoginScreen from "./Components/screens/LoginScreen";
import CartScreen from "./Components/screens/CartScreen";
import ProductScreen from "./Components/screens/ProductScreen";
import ResetPasswordScreen from "./Components/screens/ResetPasswordScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { info } from "./Components/TokenGet";
import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import HomeScreen from "./Components/screens/HomeScreen";

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
          <HomeScreen />
        </ProtectedRoute>
      ),
    },
    {
      path: "products/:id",
      element: (
        <ProtectedRoute>
          <ProductScreen />
        </ProtectedRoute>
      ),
    },
    {
      path: "cart/:id?",
      element: (
        <ProtectedRoute>
          <CartScreen />
        </ProtectedRoute>
      ),
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
      element: <Navigate to="/" replace />, // Catch-all for undefined routes
    },
  ]);
  return routes;
};

   
const App = () => {
  // const [searchResults, setSearchResults]=useState([])
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default App;
