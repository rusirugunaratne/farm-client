import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PhishingIcon from "@mui/icons-material/Phishing";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import "./_index.css";
import { useFindPath } from "../../../hooks/UseFindPath";

export default function TopBar() {
  return (
    useFindPath() !== "/" && (
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
              <Link className="link" to="/home">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DirectionsBoatIcon />}
                >
                  Home
                </Button>
              </Link>
              <Link className="link" to="/farms">
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<PhishingIcon />}
                >
                  Farms
                </Button>
              </Link>
              <Link className="link" to="/workers">
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<PeopleAltIcon />}
                >
                  Workers
                </Button>
              </Link>
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
    )
  );
}
