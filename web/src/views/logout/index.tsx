import { Box, Typography } from "@mui/material";
import React from "react";
import useToken from "../../hooks/useToken";
import {LOGIN_ROUTE_URL} from "../../routes/routes";

function LogoutPage() {
  // Here we clean token from localStorage
  const {clearToken} = useToken({})

  clearToken()
  window.location.href = LOGIN_ROUTE_URL

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
