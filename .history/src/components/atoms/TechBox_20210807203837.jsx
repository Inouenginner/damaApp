import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  bg1: {
    flex: "flexWrap",
    backgroundColor: "pink",
    width: "150px",
    height: "150px",
    position: "relative",
  },
  bg2: {
    flex: "flexWrap",
    backgroundColor: "yellow",
    width: "150px",
    height: "150px",
    position: "relative",
  },
  bg3: {
    flex: "flexWrap",
    backgroundColor: "green",
    position: "relative",
  },
  bg4: {
    flex: "flexWrap",
    backgroundColor: "purple",
    width: "150px",
    height: "150px",
    position: "relative",
  },
  bg5: {
    flex: "flexWrap",
    backgroundColor: "gray",
    width: "150px",
    height: "150px",
    position: "relative",
  },
  bg0: {
    flex: "flexWrap",
    backgroundColor: "white",
    width: "1530px",
    height: "150px",
    position: "relative",
  },
  card: {
    position: "relative",
  },
  title: {
    fontSize: 14,
  },
  titleBox: {
    height: "120px",
  },
  info: {
    position: "absolute",
    top: "120px",
    left: "10px",
  },
});

export default function TechBox(props) {
  let bg_class;
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
    case "4":
      bg_class = "bg4";
      break;
    case "5":
      bg_class = "bg5";
      break;
    case "0":
    default:
      bg_class = "bg0";
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
        <CardContent className={classes.titleBox}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.id}
          </Typography>
          <Typography variant="body2" component="body2" color="textSecondary">
            {props.name}
          </Typography>
          <Typography component="p" className={classes.info}>
            Lv.{props.level}
            {props.favorite && "⭐️"}
            {props.memo?.length > 0 && "📝"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
