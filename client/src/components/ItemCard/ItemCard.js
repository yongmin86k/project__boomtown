import React from "react";
import { graphql, compose } from "react-apollo";
import {
  ALL_ITEMS_QUERY,
  BORROW_ITEM_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";

import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { MD5 } from "../../scripts";
import * as moment from "moment";
let nowMoment = (dateNow = new Date()) => {
  return moment(dateNow).fromNow();
};

const ItemCard = ({ classes, itemInfo, viewer, BORROW_ITEM_MUTATION }) => {
  const BoolBorrowed = Boolean(itemInfo.borrower);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.cardMediaItemsImg}
          image={itemInfo.imageurl}
          title={itemInfo.title}
        />
      </CardActionArea>
      <CardHeader
        avatar={
          itemInfo.itemowner && itemInfo.itemowner.userimageurl ? (
            <Avatar
              alt={itemInfo.itemowner.fullname}
              src={itemInfo.itemowner.userimageurl}
            />
          ) : itemInfo.itemowner ? (
            <Avatar
              alt={itemInfo.itemowner.fullname}
              src={`https://www.gravatar.com/avatar/${MD5(
                itemInfo.itemowner.email
              )}?d=retro`}
            />
          ) : (
            <Avatar
              alt={viewer.fullname}
              src={`https://www.gravatar.com/avatar/${MD5(
                viewer.email
              )}?d=retro`}
            />
          )
        }
        title={
          itemInfo.itemowner ? itemInfo.itemowner.fullname : viewer.fullname
        }
        subheader={nowMoment(itemInfo.created)}
      />

      <CardContent>
        <Typography
          aria-label={itemInfo.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {itemInfo.title.length > 40
            ? `${itemInfo.title.slice(0, 40)}...`
            : itemInfo.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {itemInfo.tags
            ? itemInfo.tags
                .map(tag => tag.title)
                .sort()
                .join(", ")
            : "No tags are found"}
        </Typography>
        <Typography
          aria-label={itemInfo.description}
          variant="body1"
          color="textPrimary"
          component="p"
        >
          {itemInfo.description.length > 150
            ? `${itemInfo.description.slice(0, 150)}...`
            : itemInfo.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardMediaItemsBtn}>
        <Button
          onClick={() => {
            BORROW_ITEM_MUTATION({
              variables: {
                input: {
                  id: itemInfo.id
                }
              }
            });
          }}
          disabled={BoolBorrowed}
          variant="outlined"
        >
          {BoolBorrowed ? "Not available" : "Borrow"}
        </Button>
      </CardActions>
    </Card>
  );
};

const refetchQueries = ({ data }) => {
  return [
    { query: VIEWER_QUERY },
    {
      query: ALL_ITEMS_QUERY,
      variables: { filter: data.borrowItem.borrower.id }
    }
  ];
};

export default compose(
  graphql(BORROW_ITEM_MUTATION, {
    options: { refetchQueries },
    name: "BORROW_ITEM_MUTATION"
  }),
  withStyles(styles)
)(ItemCard);
