import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import Drawer from "@material-ui/core/Drawer";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import PersonIcon from "@material-ui/icons/Person";
// import SaveIcon from "@material-ui/icons/Save";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loading } = authContext;

  const pathname = window.location.pathname;

  const [url, setURL] = useState();

  useEffect(() => {
    setURL(window.location.href);

    // eslint-disable-next-line
  }, [loading, pathname, url]);

  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onLogout = () => {
    logout();
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      {user && (
        <List style={{ backgroundColor: "#3f51b5" }}>
          <ListItem>
            <ListItemIcon>
              <LockIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>{user.name}</ListItemText>
          </ListItem>
        </List>
      )}
      {!user && (
        <List style={{ backgroundColor: "#3f51b5" }}>
          <ListItem>
            <ListItemIcon>
              <LockOpenIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText style={{ color: "#fff" }}>Login System</ListItemText>
          </ListItem>
        </List>
      )}

      <Divider />
      <List>
        <Link
          to="/"
          style={{
            color: "#000",
            textDecoration: "none"
          }}
        >
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText style={{ marginTop: 11 }}>Dashboard</ListItemText>
          </ListItem>
        </Link>
        {/* {!isAuthenticated && !loading && (
          <Link
            to="/register"
            style={{
              color: "#000",
              textDecoration: "none"
            }}
          >
            <ListItem>
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>
              <ListItemText style={{ marginTop: 11 }}>Registro</ListItemText>
            </ListItem>
          </Link>
        )} */}

        {isAuthenticated && (
          <Link
            to="/perfil"
            style={{
              color: "#000",
              textDecoration: "none"
            }}
          >
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText style={{ marginTop: 11 }}>Meus dados</ListItemText>
            </ListItem>
          </Link>
        )}
        {isAuthenticated && (
          <Link
            to="/"
            onClick={onLogout}
            style={{
              color: "#000",
              textDecoration: "none"
            }}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToAppRoundedIcon />
              </ListItemIcon>
              <ListItemText style={{ marginTop: 11 }}>Logout</ListItemText>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {user && pathname !== "/perfil" && pathname !== "/senha" && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {pathname === "/perfil" && (
            <Link to="/" style={{ color: "#fff" }}>
              <ArrowBackIcon />
            </Link>
          )}
          {pathname === "/senha" && (
            <Link to="/" style={{ color: "#fff" }}>
              <ArrowBackIcon />
            </Link>
          )}

          <Drawer
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            anchor={"left"}
          >
            {list("Left")}
          </Drawer>
          <Typography variant="h6" style={{ marginLeft: 20 }}>
            {url && url.slice(22).toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
