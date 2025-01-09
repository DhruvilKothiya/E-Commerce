import React, { useState } from "react";
import {
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Product({ product }) {
  return (
    <Box
      sx={{
        // maxWidth: 300,
        // padding: 2,
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        backgroundColor: "#fff",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.3s ease",
        },
      }}
    >
      {/* {console.log(product)} */}
      {/* Product Image */}
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="200"
          image={"http://localhost:8000"+product?.images[0]?.image}
          alt={product.productname}
          sx={{
            borderRadius: 2,
            backgroundSize: "contain",
            objectFit: "contain",
          }}
        />
      </Link>

      {/* Favorite Icon */}
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <FavoriteBorderIcon sx={{ color: "#333" }} />
      </IconButton>

      {/* Product Details */}
      <CardContent sx={{ textAlign: "center" }}>
        <Link
          to={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "#333",fontSize: "10px" }}
        >
          <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
            {product.productname}
          </Typography>
        </Link>

        {/* Rating */}
        <Box sx={{ my: 1 }}>
          <Rating
            value={product.rating} 
            text={`${product.numReviews} reviews`}
            color="#f8e825"
          />
        </Box>

        {/* Price */}
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#d32f2f", fontWeight: "bold" }}
        >
          ₹{product.price}
        </Typography>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            mt: 2,
            width: "100%",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Box>
  );
}

export default Product;
