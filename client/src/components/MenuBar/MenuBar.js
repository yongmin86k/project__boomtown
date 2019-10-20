import React from "react";
import styles from "./styles";
import { AppBar, Toolbar, Fab, IconButton, Icon } from "@material-ui/core";

import { AddCircle as AddCircleIcon } from "@material-ui/icons";

import { withStyles } from "@material-ui/core";

import logo from "../../images/boomtown.svg";
import { MenuDropDown } from "../../components";

const MenuBar = ({ classes }) => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton color="inherit" aria-label="menu" href="/items">
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
          href="/share"
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
