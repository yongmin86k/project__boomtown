import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import { Container, Grid } from "@material-ui/core";
import { ShareItemForm, ItemCard as ShareItemPreview } from "../../components";

const Share = ({ classes, tagInfo }) => {
  return (
    <Container
      component="section"
      maxWidth={false}
      className={classes.pageShare}
    >
      <Grid container spacing={3}>
        <Grid className={classes.sharePreview} item xs={12} sm={6}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ShareItemForm tagInfo={tagInfo} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(Share);