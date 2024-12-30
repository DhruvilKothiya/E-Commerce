import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import { AccountCircle } from "@mui/icons-material";
import { info } from "./TokenGet";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { searchResultsContext } from "./Layout";

function Header() {
  const { setSearchResults } = useContext(searchResultsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000); // Debounce query state (1000ms delay)
  const navigate = useNavigate();
  const auth = info;

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      axios
        .get(`/api/products/search/?query=${debouncedQuery}`, {
          headers: {
            Authorization: `Bearer ${info.access}`,
          },
        })
        .then((response) => {
          setSearchResults(response.data); // Update search results in context
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          toast.error("Something went wrong with the search!", {
            position: "top-right",
            theme: "dark",
          });
        });
    } else {
      setSearchResults([]); // Reset search results if query is empty
    }
  }, [debouncedQuery, setSearchResults]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "white", textDecoration: "none", flexGrow: 1 }}
        >
          Ecommerce Cart
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none", marginRight: 2 }}
          >
            Home
          </Typography>
          <Typography
            component={Link}
            to="/cart"
            sx={{ color: "white", textDecoration: "none", marginRight: 2 }}
          >
            Cart
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {auth ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/signup"
                  onClick={handleMenuClose}
                >
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          <InputBase
            placeholder="Search…"
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: "white",
              color: "black",
              paddingLeft: 1,
              paddingRight: 1,
              border: "1px solid white",
              borderRadius: 1,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
