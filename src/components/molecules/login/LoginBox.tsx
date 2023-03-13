import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import backImage from "../../../assets/images/loginimage.jpg";
import TextField from "@mui/material/TextField";
import "./_index.css";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/UseForms";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginBox() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getFreshModel = () => ({
    username: "",
    password: "",
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const validate = () => {
    let temp: any = {};
    temp.username = values.username === "" ? "Invalid Username" : "";
    temp.password = values.password === "" ? "Invalid Password" : "";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    if (validate()) {
      values.username === "admin" && values.password === "admin"
        ? navigate("/home")
        : handleClick();
    }
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5, boxShadow: 15 }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Username or Password!
        </Alert>
      </Snackbar>
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
              name="username"
              value={values.username}
              onChange={handleInputChange}
              {...(errors.username && {
                error: true,
                helperText: errors.username,
              })}
            />
            <TextField
              type="password"
              className="card-content"
              id="outlined-helperText"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
            />
          </form>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2 }}>
        <Button
          onClick={handleLogin}
          size="small"
          color="primary"
          variant="contained"
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}
