import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  bg1: {
    flex: "flexWrap",
    backgroundColor: "white",
  },
  bg2: {
    flex: "flexWrap",
    backgroundColor: "gray",
  },
  bg3: {
    flex: "flexWrap",
    backgroundColor: "green",
  },
  bg4: {
    flex: "flexWrap",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TechBox(props) {
  let bg_class = "bg3";
  switch (props.achieve) {
    case "1":
      bg_class = "bg1";
      break;
    case "2":
      bg_class = "bg2";
      break;
    case "3":
      bg_class = "bg3";
      break;
    default:
      bg_class = "bg4";
  }
  const classes = useStyles();
  const dispatch = useDispatch();

  const goToWazaDetail = useCallback((id) => {
    dispatch(push("/detail/" + id));
    // eslint-disable-next-line
  }, []);

  return (
    <Card className={classes[bg_class]}>
      <CardActionArea onClick={() => goToWazaDetail(props.id)} size="small">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.id}
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.name}
          </Typography>
          <Typography variant="body2" component="p">
            {props.level}
            <br />
            {props.favorite ? "⭐️" : ""}
          </Typography>
        </CardContent>
        <Button onClick={() => goToWazaDetail(props.id)} size="small">
          Learn More
        </Button>
      </CardActionArea>
    </Card>
  );
}
