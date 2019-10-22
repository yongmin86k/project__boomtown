import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import { Container, Grid } from "@material-ui/core";
import { ShareItemForm, ShareItemPreview } from "../../components";

const Share = ({ classes, tagInfo }) => {
  return (
    <Container component="section" maxWidth={false} className={classes.page}>
      <Grid container spacing={6}>
        <Grid className={classes.preview} item xs={12} sm={6}>
          <Grid container className={classes.containerChildLeft}>
            <Grid item xs={12} className={classes.item}>
              <ShareItemPreview />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container className={classes.containerChildRight}>
            <Grid item xs={12} className={classes.item}>
              <ShareItemForm tagInfo={tagInfo} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(Share);
