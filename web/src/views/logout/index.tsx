import { Box, Typography } from "@mui/material";
import React from "react";

function LogoutPage() {
  // Here we clean token from localStorage

  return (
    <Box
      key={"github-fs-logout"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
      }}
    >
      <Typography>{"Logged Out"}</Typography>
    </Box>
  );
}

export default LogoutPage;
