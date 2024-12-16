// src/screens/SignupScreen.js
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Slice/userSlice";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/App.css";

function SignupScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerUser(data));

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(error || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Container sx={{ mt: 3, width: "50%" }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="First Name"
                  fullWidth
                  {...register("fname", { required: "First Name is required" })}
                  error={!!errors.fname}
                  helperText={errors.fname?.message}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  {...register("lname", { required: "Last Name is required" })}
                  error={!!errors.lname}
                  helperText={errors.lname?.message}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Login here</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignupScreen;
