import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export const HeaderMenus = (props) => {
  return (
    <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
      <MenuIcon />
    </IconButton>
  );
};
