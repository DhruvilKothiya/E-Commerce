import React from "react";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full-screen loader
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
