import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, requestPasswordReset } from "../../Slice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginScreen() {
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    // navigate('/')
    window.location.href = '/'
    
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    dispatch(requestPasswordReset(email));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <Box sx={{ padding: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register("username", { required: "Email is required" })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </form>

              <Dialog
                open={openForgotPasswordDialog}
                onClose={() => setOpenForgotPasswordDialog(false)}
              >
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenForgotPasswordDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleForgotPassword}
                    variant="contained"
                    color="primary"
                  >
                    Send Reset Link
                  </Button>
                </DialogActions>
              </Dialog>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" align="center">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginScreen;
