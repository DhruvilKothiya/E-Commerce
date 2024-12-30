import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function Sidebar() {
  const [openCategory, setOpenCategory] = useState(true);

  const toggleCategory = () => {
    setOpenCategory(!openCategory);
  };

  return (
    <Box
      sx={{
        flex: "1",
        maxWidth: "250px",
        backgroundColor: "#f9f9f9",
        padding: "16px",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Categories
      </Typography>
      <List component="nav">
        <ListItem button onClick={toggleCategory}>
          <ListItemText primary="Categories" />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Men", "Women", "Bags", "Clothing", "Shoes", "Accessories", "Kids"].map((category, index) => (
              <ListItem button key={index} sx={{ pl: 4 }}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Filters
      </Typography>
      <List component="nav">
        {["Branding", "Filter Price", "Size", "Colors", "Tags"].map((filter, index) => (
          <ListItem button key={index}>
            <ListItemText primary={filter} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
