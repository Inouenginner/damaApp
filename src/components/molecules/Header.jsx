import React, { useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ClosableDrawer } from "../organisms/ClosableDrawer";
import { HeaderMenus } from "../atoms/button/HeaderMenus";

export const Header = () => {
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
    <>
      <AppBar position="static">
        <Toolbar>
          <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
          <Typography variant="h6">てるからの挑戦状</Typography>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </>
  );
};
