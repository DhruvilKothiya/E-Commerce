import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Card,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating";
import Message from "../Message";
import { fetchProductDetails } from "../../Slice/productDetailsSlice";

function ProductScreen({ params }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Go Back
        </Button>
      </Link>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <Typography variant="h4">{product.productname}</Typography>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
            <Typography variant="body1">
              Brand: {product.productbrand}
            </Typography>
            <Typography variant="body2">
              Description: {product.productinfo}
            </Typography>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Price: {product.price} Rs
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    Status:{" "}
                    {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </Grid>

                {product.stockcount > 0 && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Qty</InputLabel>
                      <Select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        label="Qty"
                      >
                        {[...Array(product.stockcount).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={product.stockcount === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ProductScreen;
