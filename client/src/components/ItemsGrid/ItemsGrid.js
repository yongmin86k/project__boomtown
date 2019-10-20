import React from "react";
import { Container, Grid } from "@material-ui/core";
import { ItemCard } from "../../components";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const ItemsGrid = ({ classes, items }) => (
  <Container component='section' maxWidth={false} className={classes.pageItems}>
    <Grid
      container
      spacing={3}
    >
      {items.length
        ? items.map(itemInfo => {
            return <ItemCard key={itemInfo.id} itemInfo={itemInfo} />;
          })
        : `There is no item yet.`}
    </Grid>
  </Container>
);

export default withStyles(styles)(ItemsGrid);
