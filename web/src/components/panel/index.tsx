import { Box, Link, Typography } from "@mui/material";
import React from "react";
import {
  DEFAULT_FONT_COLOR,
  LOGGIN_PANEL_BACKGROUND_COLOR,
} from "../../theme/paletteUtils";
import IconsFactory from "../../icons/IconsFactory";

export interface PanelLayoutProps {
  viewName: string;
  description: string;
  children: React.ReactNode;
  linkTitle?: string;
  link?: string;
  linkDescription?: string;
}

function PanelLayout(props: PanelLayoutProps) {
  const { viewName, description, link, linkTitle, linkDescription } = props;

  return (
    <Box
      key={`${viewName}-panel`}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "6px",
        backgroundColor: LOGGIN_PANEL_BACKGROUND_COLOR,
        width: "400px",
        minHeight: "400px",
        py: "20px",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "60px",
          px: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <IconsFactory.Views.FS sx={{ color: "black", fontSize: 40 }} />
          <Typography fontSize={30}>{"Github File System"}</Typography>
        </Box>
        <Typography
          fontSize={14}
          color={DEFAULT_FONT_COLOR}
          sx={{ textAlign: "center" }}
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height : "400px",
          with: 1,
          gap: "10px",
        }}
      >
        {props.children}
        <Box
          data-testid="register-hyperlink"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography color={DEFAULT_FONT_COLOR}>{linkDescription}</Typography>
          {link && <Link href={link}>{linkTitle || "Click here"}</Link>}
        </Box>
      </Box>
    </Box>
  );
}

export default PanelLayout;
