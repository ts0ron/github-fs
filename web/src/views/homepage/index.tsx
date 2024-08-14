import {Box, Typography} from "@mui/material";
import React from "react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import {FS_TREE_ROUTE_URL} from "../../routes/routes";
import {DEFAULT_FONT_COLOR} from "../../theme/paletteUtils";

interface HomePageProps {
}

function HomePage(props: HomePageProps) {
  const loggedIn = useIsLoggedIn()

  if (loggedIn) {
    window.location.href = FS_TREE_ROUTE_URL
  }

  return (

    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>
      <Typography sx={{fontSize: 40, color: DEFAULT_FONT_COLOR}}>{"Welcome to Github File System"}</Typography>
    </Box>
  );
}

export default HomePage;
