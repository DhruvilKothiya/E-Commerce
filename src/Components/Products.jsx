import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Rating from './Rating';

function Product({ product }) {
  return (
    <Card sx={{ my: 3, p: 3, borderRadius: 2 }}>
      <Link to={`/products/${product._id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.productname}
        />
      </Link>
      <CardContent>
        <Link to={`/products/${product._id}`} style={{ textDecoration: "none", color: "black" }}>
          <Typography variant="h6" component="h3">
            {product.productname}
          </Typography>
        </Link>

        <Box sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {product.rating} from {product.numReviews} reviews
          </Typography>
        </Box>

        <Typography variant="h6" component="div">
          {product.price} Rs
        </Typography>
        
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color="#f8e825"
        />
      </CardContent>
    </Card>
  );
}

export default Product;
