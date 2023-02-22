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
import Avatar from "@mui/material/Avatar";
import { createAPIEndpoint, ENDPOINTS } from "../../../../api";
import SailingIcon from "@mui/icons-material/Sailing";

function AddWorker() {
  const navigate = useNavigate();
  const getFreshModel = () => ({
    name: "",
    image: "",
    latitude: 0,
    longitude: 0,
    hasBarge: "off",
    imageFile: null,
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const handleAddFarm = () => {
    console.log(values);
    if (validate()) {
      const formData = new FormData();
      formData.append("file", values.imageFile);
      createAPIEndpoint(ENDPOINTS.fileUpload)
        .post(formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      createAPIEndpoint(ENDPOINTS.farm)
        .post({
          farmName: values.name,
          latitude: values.latitude,
          longitude: values.longitude,
          image: values.image,
          hasBarge: values.hasBarge === "on" ? true : false,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      navigate("/farms");
    }
  };

  const validateDecimals = (number: number) => {
    const numberString = number.toString();
    if (numberString.length === 0 || !numberString.includes(".")) {
      return "Not valid";
    } else {
      return numberString.split(".")[1].length === 4
        ? ""
        : "Should be correct for 4 decimal places";
    }
  };

  const handleInputImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (x) => {
        setValues({ ...values, imageFile: imageFile, image: x.target?.result });
      };
      reader.readAsDataURL(imageFile);
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
            label="Age"
            type="number"
            value={values.latitude}
            name="age"
            defaultValue=""
            {...(errors.latitude && {
              error: true,
              helperText: errors.latitude,
            })}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-helperText"
            label="Email"
            value={values.longitude}
            name="email"
            defaultValue=""
            {...(errors.longitude && {
              error: true,
              helperText: errors.longitude,
            })}
            onChange={handleInputChange}
          />
          <FormControlLabel
            name="hasBarge"
            // value={values.hasBarge}
            control={<Switch />}
            label="Has a Barge"
            onChange={handleInputChange}
          />
          <div className="image">
            <Avatar variant="rounded" alt={values.name} src={values.image}>
              <SailingIcon />
            </Avatar>
            <Button
              startIcon={<PhotoCamera />}
              variant="contained"
              component="label"
            >
              Upload Image
              <input
                hidden
                name="image"
                accept="image/*"
                type="file"
                onChange={handleInputImage}
              />
            </Button>
          </div>
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
            Add
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

export default AddWorker;
