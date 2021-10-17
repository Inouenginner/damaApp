import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIconc from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { useSelector } from "react-redux";
import { getSignedIn } from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  drawerPaper: {
    width: 256,
  },
}));

export const ClosableDrawer = (props) => {
  const classes = useStyles();
  //propsをcontainerという連想配列にする(Drawerに渡す。なぜか知らない)
  const { container } = props;
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);
  const dispatch = useDispatch();

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters] = useState([
    {
      func: selectMenu,
      label: "問い合わせ（作成中。成績一覧画面へ遷移します）",
      id: "inquiry",
      value: "/record",
    },
    {
      func: selectMenu,
      label: "作者プロフィール（作成中。成績一覧画面へ遷移します）",
      id: "author",
      value: "/record",
    },
  ]);
  const menus = [
    {
      func: selectMenu,
      label: "成績一覧へ",
      icon: <AppsIcon />,
      id: "record",
      value: "/record",
    },
    {
      func: selectMenu,
      label: "チャートへ",
      icon: <EqualizerIcon />,
      id: "chart",
      value: "/resultCharts",
    },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="left"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onClose={(e) => props.onClose(e)} onKeyDown={(e) => props.onClose(e)}>
          <Divider />
          {isSignedIn && (
            <List>
              {menus.map((menu) => (
                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              ))}
              <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                <ListItemIcon>
                  <ExitToAppIconc />
                </ListItemIcon>
                <ListItemText primary={"logout"} />
              </ListItem>
            </List>
          )}
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem button key={filter.id} onClick={(e) => alert("ただいま作成中です。。。")}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};
