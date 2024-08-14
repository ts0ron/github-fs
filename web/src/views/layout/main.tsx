import React from "react";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { PAGE_CONTENT_STYLE } from "../../theme/styleUtils";
import IconsFactory from "../../icons/IconsFactory";
import { APP_BAR_COLOR } from "../../theme/paletteUtils";
import useToken from "../../hooks/useToken";
import { grey } from "@mui/material/colors";

export interface MainLayoutProps {
  children: React.ReactNode;
  includeAppBar?: boolean;
}

function MainLayout(props: MainLayoutProps) {
  const { includeAppBar } = props;
  const { isTokenExpired, clearToken } = useToken();


  return includeAppBar ? (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: APP_BAR_COLOR,
          height: "64px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconsFactory.Views.FS sx={{ color: "black" }} />
            <Typography>{"Github File System"}</Typography>
          </Box>
          <Box sx={{ ...PAGE_CONTENT_STYLE }}>
            <Button
              sx={{ width: "100px", color: grey[300] }}
              // variant="contained"
              onClick={() => {
                if (!isTokenExpired) {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                } else {
                  window.location.href = "/logout";
                }
              }}
            >
              {!isTokenExpired ? "Logout" : "Login"}
            </Button>
            {isTokenExpired && <Button
              sx={{ width: "100px", color: grey[300] }}
              // variant="contained"
              onClick={() => {
                if (isTokenExpired) {
                  window.location.href = "/login";
                } else {
                  window.location.href = "/logout";
                }
              }}
            >
              {"Sign Up"}
            </Button>}
          </Box>
        </Box>
      </AppBar>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
        {props.children}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(159deg, rgb(117, 117, 117) 0%, rgb(66, 66, 66) 100%) 0% 0% no-repeat padding-box padding-box transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </Box>
  );
}

export default MainLayout;
