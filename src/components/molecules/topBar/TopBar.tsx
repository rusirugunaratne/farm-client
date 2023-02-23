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
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const path = useFindPath();

  const getSection = () => {
    if (path === "/home") {
      return "HOME";
    } else if (path === "/farms") {
      return "FARMS";
    } else if (path === "/workers") {
      return "WORKERS";
    } else if (path === "/farms/addFarm") {
      return "ADD FARM";
    } else if (path === "/farms/editFarm") {
      return "EDIT FARM";
    } else if (path === "/workers/editWorker") {
      return "EDIT WORKER";
    } else if (path === "/workers/addWorker") {
      return "ADD WORKER";
    } else {
      return "";
    }
  };

  return (
    path !== "/" && (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "#062c47" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
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
              {"Havbruksloggen | " + getSection()}
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
                  color="primary"
                  startIcon={<PhishingIcon />}
                >
                  Farms
                </Button>
              </Link>
              <Link className="link" to="/workers">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PeopleAltIcon />}
                >
                  Workers
                </Button>
              </Link>
              <Button
                onClick={() => {
                  navigate("/");
                }}
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
