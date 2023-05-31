import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import Button from "@mui/material/Button";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import { Offline, Online } from "react-detect-offline";
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BEM-ONSITE
          </Typography>
          <Online>
            <IconButton size="large" aria-label="search" color="inherit">
              <WifiIcon />
            </IconButton>
          </Online>
          <Offline>
            <IconButton size="large" aria-label="search" color="inherit">
              <WifiOffIcon />
            </IconButton>
          </Offline>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
