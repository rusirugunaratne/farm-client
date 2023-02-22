import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import fishFarm from "../../../assets/images/fish-farm.jpg";
import worker from "../../../assets/images/worker.jpg";
import { useNavigate } from "react-router-dom";

export default function HomeCard(props: any) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 345, maxHeight: 400, borderRadius: 5, boxShadow: 10 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.name === "farm" ? fishFarm : worker}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            navigate(props.route);
          }}
          size="small"
          color="primary"
        >
          {props.name}
        </Button>
      </CardActions>
    </Card>
  );
}
