import "./_index.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useForm from "../../../../hooks/useForms";
import { useNavigate } from "react-router-dom";
import "./_index.css";
import { useLocation } from "react-router-dom";

function EditFarm() {
  const { state } = useLocation();
  const { name, latitude, longitude, hasBarge } = state;
  console.log("barge", hasBarge);
  const navigate = useNavigate();

  const getFreshModel = () => ({
    name: name,
    image: "",
    latitude: latitude,
    longitude: longitude,
    hasBarge: hasBarge,
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const handleAddFarm = () => {
    console.log(values);
    console.log(validate());
    if (validate()) {
      navigate("/farms");
    }
  };

  const validateDecimals = (number: any) => {
    const numberString = number.toString();
    if (numberString.length === 0 || !numberString.includes(".")) {
      return "Not valid";
    } else {
      return numberString.split(".")[1].length === 4
        ? ""
        : "Should be correct for 4 decimal places";
    }
  };

  const validate = () => {
    let temp: any = {};
    temp.name = values.name === "" ? "Invalid Name" : "";
    temp.latitude = validateDecimals(values.latitude);
    temp.longitude = validateDecimals(values.longitude);
    temp.image = values.image === "" ? "Upload an Image" : "";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <div className="container">
      <Card
        sx={{ minWidth: 300, maxWidth: 800, borderRadius: 5, boxShadow: 5 }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="outlined-helperText"
            label="Name"
            value={values.name}
            name="name"
            defaultValue=""
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
          <TextField
            id="outlined-helperText"
            label="Latitude"
            type="number"
            value={values.latitude}
            name="latitude"
            defaultValue=""
            {...(errors.latitude && {
              error: true,
              helperText: errors.latitude,
            })}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-helperText"
            label="Longitude"
            type="number"
            value={values.longitude}
            name="longitude"
            defaultValue=""
            {...(errors.longitude && {
              error: true,
              helperText: errors.longitude,
            })}
            onChange={handleInputChange}
          />
          <FormControlLabel
            name="hasBarge"
            value={values.hasBarge}
            control={<Switch />}
            label="Has a Barge"
            onChange={handleInputChange}
          />
          <Button
            startIcon={<PhotoCamera />}
            variant="contained"
            component="label"
          >
            Upload Image
            <input
              hidden
              name="image"
              value={values.image}
              accept="image/*"
              type="file"
              onChange={handleInputChange}
            />
          </Button>
          {errors.image && (
            <h1
              style={{
                fontSize: "12px",
                color: "red",
                fontWeight: "normal",
                fontFamily: "Arial",
              }}
            >
              Image required
            </h1>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={handleAddFarm} color="primary" size="small">
            Update
          </Button>
          <Button
            onClick={() => {
              navigate("/farms");
            }}
            color="warning"
            size="small"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default EditFarm;
