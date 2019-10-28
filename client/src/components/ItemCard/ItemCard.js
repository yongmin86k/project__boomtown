import React from "react";

import { Form, Field, FormSpy } from "react-final-form";
import { Mutation } from "react-apollo";
import { BORROW_ITEM_MUTATION } from "../../apollo/queries";

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

const ItemCard = ({ classes, itemInfo, viewer }) => {
  const BoolBorrowed = Boolean(itemInfo.borrower);

  return (
    <Mutation mutation={BORROW_ITEM_MUTATION}>
      {(borrowItem, { data }) => (
        <Form
          onSubmit={() => {
            borrowItem({
              variables: {
                input: {
                  id: itemInfo.id
                }
              }
            });
          }}
          render={({ handleSubmit }) => (
            <form
              onSubmit={e => {
                handleSubmit(e);
              }}
            >
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
                    itemInfo.itemowner
                      ? itemInfo.itemowner.fullname
                      : viewer.fullname
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
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
                    type="submit"
                    disabled={BoolBorrowed}
                    variant="outlined"
                  >
                    {BoolBorrowed ? "Not available" : "Borrow"}
                  </Button>
                </CardActions>
              </Card>
            </form>
          )}
        />
      )}
    </Mutation>
  );
};

export default withStyles(styles)(ItemCard);
