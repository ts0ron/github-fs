import { Box, Typography } from "@mui/material";
import React from "react";
import { PAGE_CONTENT_STYLE } from "../../theme/styleUtils";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

interface HomePageProps {}

function HomePage(props: HomePageProps) {
  return (
    <Box sx={PAGE_CONTENT_STYLE}>
      <Typography>{"This is the Home page"}</Typography>
    </Box>
  );
}

export default HomePage;
