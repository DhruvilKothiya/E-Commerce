import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../Slice/cartSlice"; // Adjust path
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

function CartScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const { cartItems } = useSelector((state) => state.cart );
  useEffect(() => {
    if (id) {
      dispatch(addToCart({ product: id, qty }));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cart Items
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">
          Your cart is empty. <Link to="/">Go Back</Link>
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item md={8} xs={12} key={item.product}>
              <Card sx={{ display: "flex", mb: 2 }}>
                <ImageListItem sx={{ width: 100, height: 100 }}>
                  <img src={item.image} alt={item.productname} loading="lazy" />
                  <ImageListItemBar title={item.productname} />
                </ImageListItem>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.productname}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Rs. {item.price}
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Quantity</InputLabel>
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            product: item.product,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                      label="Quantity"
                    >
                      {[...Array(item.stockcount).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    color="secondary"
                    onClick={() => removeFromCartHandler(item.product)}
                    sx={{ mt: 1 }}
                  >
                    <i className="fas fa-trash"></i>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Grid>
    </Container>
  );
}

export default CartScreen;
