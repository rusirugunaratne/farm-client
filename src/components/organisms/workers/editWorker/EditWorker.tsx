import "./_index.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useForm from "../../../../hooks/UseForms";
import { useNavigate } from "react-router-dom";
import "./_index.css";
import Avatar from "@mui/material/Avatar";
import { createAPIEndpoint, ENDPOINTS } from "../../../../api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { z } from "zod";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useStore from "../../../../hooks/UseStore";
import { useState } from "react";

function EditWorker() {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { id, name, age, email, farmId, position, certifiedUntil, image } =
    state;
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const {
    farms,
    farmsLoading,
    getFarmId,
    getFarmName,
    updateWorker,
    uploadFile,
  } = useStore();

  const navigate = useNavigate();
  const getFreshModel = () => ({
    name: name,
    image: image,
    age: age,
    farmId: farmId,
    email: email,
    position: position,
    imageFile: null,
    certifiedUntil: certifiedUntil,
    farmName: getFarmName(farmId),
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const handleEditWorker = () => {
    if (validate()) {
      if (values.image !== "" && isImageUploaded) {
        const formData = new FormData();
        formData.append("file", values.imageFile);
        uploadFile(formData);
      }
      updateWorker(id, values);
      navigate("/workers");
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
      setIsImageUploaded(true);
    }
  };

  const validate = () => {
    let temp: any = {};
    temp.name = values.name === "" ? "Invalid Name" : "";
    temp.age = values.age > 60 || values.age < 18 ? "Not eligible to work" : "";
    temp.email = z.string().email().safeParse(values.email).success
      ? ""
      : "Not a valid email";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  if (farmsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          margin: 10,
          gap: 5,
        }}
      >
        <CircularProgress />
        <p>Loading...</p>
      </Box>
    );
  }

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
            value={values.age}
            name="age"
            defaultValue=""
            {...(errors.age && {
              error: true,
              helperText: errors.age,
            })}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-helperText"
            label="Email"
            value={values.email}
            name="email"
            defaultValue=""
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Farm</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.farmName}
              label="farmName"
              name="farmName"
              defaultValue={values.farmName}
              onChange={handleInputChange}
            >
              {farms?.map((farm: any) => (
                <MenuItem key={farm.id} value={farm.name}>
                  {farm.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.position}
              name="position"
              label="Position"
              defaultValue={values.position}
              onChange={handleInputChange}
            >
              <MenuItem value={"CEO"}>CEO</MenuItem>
              <MenuItem value={"Worker"}>Worker</MenuItem>
              <MenuItem value={"Captain"}>Captain</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-helperText"
            label="Certified Until"
            type="date"
            value={values.certifiedUntil}
            name="certifiedUntil"
            {...(errors.latitude && {
              error: true,
              helperText: errors.latitude,
            })}
            onChange={handleInputChange}
          />

          <div className="image">
            <Avatar variant="rounded" alt={values.name} src={values.image}>
              <AccountCircleIcon />
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
          <Button onClick={handleEditWorker} color="primary" size="small">
            Edit
          </Button>
          <Button
            onClick={() => {
              navigate("/workers");
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

export default EditWorker;
