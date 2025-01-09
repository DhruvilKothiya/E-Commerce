import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductDetails,
  removeFromCart,
  updateCartQuantity,
} from "../../Slice/cartSlice";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Link,
} from "@mui/material";
import { Delete as DeleteIcon, Add, Remove } from "@mui/icons-material";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const incrementQty = (id, currentQty) => {
    dispatch(updateCartQuantity({ id, qty: currentQty + 1 }));
  };

  const decrementQty = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateCartQuantity({ id, qty: currentQty - 1 }));
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : cartItems.length === 0 ? (
        <Typography>
          Your cart is empty. <Link to="/">Go Back</Link>
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.product}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={item.image}
                            alt={item.productname}
                            style={{ width: 60, height: 60, marginRight: 16 }}
                          />
                          <Typography>{item.productname}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <IconButton
                            color="primary"
                            onClick={() => decrementQty(item.product, item.qty)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ mx: 2 }}>{item.qty}</Typography>
                          <IconButton
                            color="primary"
                            onClick={() => incrementQty(item.product, item.qty)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        Rs. {(item.price * item.qty).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cart Total
              </Typography>
              <Typography>Subtotal: Rs. {calculateSubtotal()}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartScreen;
