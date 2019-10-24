import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} />
      <Typography gutterBottom variant="h5" component="h2" color="primary">
        “For it is in giving that we receive.”
      </Typography>
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
