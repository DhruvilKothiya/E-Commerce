import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ResetPasswordScreen() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/users/reset-password-confirm/${uidb64}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Password reset failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Card>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  );
}

export default ResetPasswordScreen;
