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
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import Message from "../Message";
import { fetchProductDetails } from "../../Slice/productDetailsSlice";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XXL", "XL", "L", "S"];
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${id}?qty=${qty}`);
  };

  const addToWishlistHandler = () => {
    alert("Product added to wishlist!");
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            textDecoration: "underline",
            display: "inline-block",
            mb: 2,
            fontSize: "12px",
            paddingLeft: "20px",
            color: "black",
          }}
        >
          &lt; Back to results
        </Typography>
      </Link>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid spacing={3}>
          <div className="product-detail">
            {/* Product Images */}
            <Grid
              item
              xs={12}
              md={5}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 60px",
                // margintop: "0px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {/* Thumbnails */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: 2,
                  }}
                >
                  {product?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      style={{
                        borderRadius: "8px",
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        cursor: "pointer",
                        border: "2px solid #ddd",
                      }}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setMainImageIndex(index)} // Set main image when thumbnail clicked
                    />
                  ))}
                </Box>

                {/* Main Image */}
                <Box>
                  <img
                    src={product?.images?.[mainImageIndex]?.image || ""}
                    alt="Main Product"
                    style={{
                      borderRadius: "8px",
                      maxWidth: "400px",
                      maxHeight: "400px",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={11} md={3}>
              <Box sx={{ textAlign: "center", alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {product.productname}
                </Typography>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="#f8e825"
                />
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  Brand: {product.productbrand}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Size:
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      onClick={() => handleSizeSelect(size)}
                      sx={{
                        width: 60,
                        height: 40,
                        textTransform: "none",
                        fontWeight: 600,
                        color: selectedSize === size ? "#fff" : "#000",
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, color: "#3d3d3d", mt: 2 }}
                >
                  Location: {product.location || "Not specified"}
                </Typography>

                {/* Delivery Options */}
                <Box sx={{ mt: 3, textAlign: "left", paddingLeft: "20px" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocalShippingIcon color="primary" />
                    <Typography variant="body2">Free Delivery</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <PaymentIcon color="secondary" />
                    <Typography variant="body2">Pay on Delivery</Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </div>
          {/* Cart and Actions */}
          <Grid
            item
            xs={8}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              className="paper-cart"
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "380px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#3f51b5", mb: 1 }}
              >
                ₹{product.price}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Status: {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
              </Typography>
              {product.stockcount > 0 && (
                <FormControl fullWidth sx={{ mb: 2 }}>
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
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={product.stockcount === 0}
                onClick={addToCartHandler}
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleBuyNow}
                sx={{ mb: 2 }}
              >
                Buy Now
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={addToWishlistHandler}
              >
                Add to Wishlist
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ProductScreen;
