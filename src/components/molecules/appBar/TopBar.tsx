import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PhishingIcon from "@mui/icons-material/Phishing";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            THE FIN - FARMER
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<PhishingIcon />}
            >
              Farms
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<PeopleAltIcon />}
            >
              Workers
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<LockIcon />}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
