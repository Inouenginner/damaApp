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
  title: {
    display: "block",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
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
          <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
          <Typography className={classes.title} variant="h6">
            てるからの挑戦状
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};
