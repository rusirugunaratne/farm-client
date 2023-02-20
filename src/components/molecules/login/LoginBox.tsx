import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import backImage from "../../../assets/images/login-box-background.png";
import TextField from "@mui/material/TextField";
import "./_index.css";

export default function LoginBox() {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5, boxShadow: 15 }}>
      <CardActionArea disableTouchRipple={true} disableRipple={true}>
        <CardMedia component="img" height="140" image={backImage} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
          <form className="content-group">
            <TextField
              className="card-content"
              id="outlined-helperText"
              label="Username"
              helperText="Some important text"
            />
            <TextField
              className="card-content"
              id="outlined-helperText"
              label="Password"
              helperText="Some important text"
            />
          </form>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2 }}>
        <Button size="small" color="primary" variant="contained">
          Login
        </Button>
      </CardActions>
    </Card>
  );
}
