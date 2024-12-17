import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const searchResultsContext = React.createContext({});

const Layout = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <searchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </searchResultsContext.Provider>
  );
};

export default Layout;
