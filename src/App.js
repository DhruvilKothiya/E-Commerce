// import React from "react";
import { Navigate } from "react-router-dom";
// import HomeScreen from "./Components/screens/HomeScreen";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import HomeScreen from "./Components/screens/HomeScreen";
import AppRoutes from "./Components/AppRoutes";

const App = () => {
  // const [searchResults, setSearchResults] = useState([]);
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
};

export default App;
