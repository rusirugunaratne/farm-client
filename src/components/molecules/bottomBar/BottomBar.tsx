import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Link to="addFarm">
            <StyledFab color="secondary" aria-label="add">
              <AddIcon />
            </StyledFab>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
