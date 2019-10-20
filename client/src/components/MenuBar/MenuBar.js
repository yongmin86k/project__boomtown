import React from "react";
import styles from "./styles";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Fab, IconButton, Icon } from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core";
import { MenuDropDown } from "../../components";
import logo from "../../images/boomtown.svg";

const MenuBar = ({ classes }) => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="menu"
        component={NavLink}
        to={"/items"}
      >
        <Icon className={classes.menuButton}>
          <img className={classes.imgLogo} src={logo} alt="Boomtown" />
        </Icon>
      </IconButton>

      <div className={classes.menuBar}>
        <Fab
          className={classes.btnShare}
          variant="extended"
          color="primary"
          aria-label="share"
          component={NavLink}
          to={"/share"}
        >
          <AddCircleIcon className={classes.extendedIcon} />
          Share something
        </Fab>

        <MenuDropDown />
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(MenuBar);
