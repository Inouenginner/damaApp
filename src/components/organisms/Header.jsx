import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ClosableDrawer } from "../molecules/ClosableDrawer";
import { HeaderMenus } from "../molecules/HeaderMenus";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.iconButtons}>
            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            てるからの挑戦状
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};
