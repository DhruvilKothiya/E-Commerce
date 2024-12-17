import React, { useContext, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import Product from "../Products";
import { fetchProducts } from "../../Slice/productsSlice";
import { searchResultsContext } from "../Layout";

function HomeScreen() {
  const { searchResults } = useContext(searchResultsContext);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsList
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayedProducts = searchResults.length > 0 ? searchResults : products;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          This Course is free & valid only on ARKPROCODER YouTube channel
        </Typography>
      </Box>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {displayedProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomeScreen;
