import React, { Fragment } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography
} from "@material-ui/core";

import {
  MoreVert as MoreVertIcon,
  Fingerprint as FingerprintIcon,
  PowerSettingsNew as PowerSettingsNewIcon
} from "@material-ui/icons";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//   const options = [
//     { icon: "<FingerprintIcon/>", label: "Your Profile", link: "/" },
//     { icon: null, label: "Sign Out", link: "/" }
//   ];
  

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <FingerprintIcon fontSize="default" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Your Profile
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="default" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Sign Out
          </Typography>
        </MenuItem>

        {/* {options.map((option, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        ))} */}
      </Menu>
    </Fragment>
  );
}
