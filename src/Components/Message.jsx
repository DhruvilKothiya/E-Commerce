import React from "react";
import { Alert } from "@mui/material";

function Message({ variant = "info", children }) {
  return <Alert severity={variant}>{children}</Alert>;
}

export default Message;
