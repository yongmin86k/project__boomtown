import React from "react";
import { Grid } from "@material-ui/core";
import { ItemCard } from "../../components";
import { ViewerContext } from "../../context/ViewerProvider";

const ItemsGrid = ({ items }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Grid container spacing={3}>
        {items.length
          ? items.map(itemInfo => {
              return (
                <Grid key={itemInfo.id} item xs={12} sm={6} md={4}>
                  <ItemCard itemInfo={itemInfo} viewer={viewer} />
                </Grid>
              );
            })
          : `There is no item yet.`}
      </Grid>
    )}
  </ViewerContext.Consumer>
);

export default ItemsGrid;
