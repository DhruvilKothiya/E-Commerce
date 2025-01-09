import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import Product from "../Products";
import { fetchProducts } from "../../Slice/productsSlice";
import { searchResultsContext } from "../Layout";
import Sidebar from "../Sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";

function HomeScreen() {
  const { searchResults } = useContext(searchResultsContext);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsList
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const displayedProducts = searchResults.length > 0 ? searchResults : products;

  return (
    <Box sx={{ mt: 4, display: "flex" }}>
      <CssBaseline />
      {/* Conditional Sidebar Drawer */}
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ position: "fixed", top: 5, left: 16, zIndex: 1300 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={drawerOpen}
            onClose={toggleDrawer}
            anchor="left"
            sx={{
              "& .MuiDrawer-paper": {
                width: 250,
                paddingLeft: "10px",
              },
            }}
          >
            <Sidebar />
          </Drawer>
        </>
      ) : (
        <Box sx={{pr: 2 }}>
          <Sidebar />
        </Box>
      )}

      {/* Product List */}
      <Container maxWidth="false" sx={{ flexGrow: 1 }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Grid container spacing={3}>
            {displayedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default HomeScreen;
