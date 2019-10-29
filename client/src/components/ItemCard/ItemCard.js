import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";

import { graphql, compose } from "react-apollo";
import {
  BORROW_ITEM_MUTATION,
  RETURN_ITEM_MUTATION
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
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import PropTypes from "prop-types";

import { MD5 } from "../../scripts";
import * as moment from "moment";
let nowMoment = (dateNow = new Date()) => {
  return moment(dateNow).fromNow();
};
class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes,
      itemInfo,
      viewer,
      BORROW_ITEM_MUTATION,
      RETURN_ITEM_MUTATION
    } = this.props;
    const BoolBorrowed = Boolean(itemInfo.borrower);

    return (
      <Form
        onSubmit={async () => {
          if (itemInfo.itemowner) {
            try {
              !BoolBorrowed
                ? BORROW_ITEM_MUTATION({
                    variables: {
                      input: {
                        id: itemInfo.id
                      }
                    }
                  })
                : RETURN_ITEM_MUTATION({
                    variables: {
                      input: {
                        id: itemInfo.id
                      }
                    }
                  });
            } catch (e) {
              throw e;
            }
          }
        }}
        render={({ handleSubmit }) => (
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <Card>
              <CardActionArea>
                {itemInfo.itemowner ? (
                  <CardMedia
                    className={classes.cardMediaItemsImg}
                    image={itemInfo.imageurl}
                    title={itemInfo.title}
                    component={Link}
                    to={`/profile/${itemInfo.itemowner.id}`}
                  />
                ) : (
                  <CardMedia
                    className={classes.cardMediaItemsImg}
                    image={itemInfo.imageurl}
                    title={itemInfo.title}
                  />
                )}
              </CardActionArea>
              {itemInfo.itemowner ? (
                <CardActionArea>
                  <CardHeader
                    component={Link}
                    to={`/profile/${itemInfo.itemowner.id}`}
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
                </CardActionArea>
              ) : (
                <CardActionArea>
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
                </CardActionArea>
              )}

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
              <Grid container direction="row" justify="space-between">
                {/*  */}
                {itemInfo.itemowner && itemInfo.itemowner.id === viewer.id ? (
                  ""
                ) : (
                  <CardActions className={classes.cardMediaItemsBtn}>
                    <Button
                      type="submit"
                      disabled={BoolBorrowed}
                      variant="outlined"
                    >
                      {BoolBorrowed ? "Not available" : "Borrow"}
                    </Button>
                  </CardActions>
                )}

                {/*  */}
                {BoolBorrowed && itemInfo.borrower.id === viewer.id ? (
                  <CardActions className={classes.cardMediaItemsBtn}>
                    <Button type="submit" variant="contained" color="primary">
                      Return
                    </Button>
                  </CardActions>
                ) : (
                  ""
                )}
              </Grid>
            </Card>
          </form>
        )}
      />
    );
  }
}

ItemCard.propTypes = {
  itemInfo: PropTypes.object,
  viewer: PropTypes.object,
  BORROW_ITEM_MUTATION: PropTypes.func.isRequired,
  RETURN_ITEM_MUTATION: PropTypes.func.isRequired,

  itemInfo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageurl: PropTypes.string,
    tags: PropTypes.array,
    itemowner: PropTypes.object,
    borrower: PropTypes.object,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }),

  viewer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    userimageurl: PropTypes.string,
    bio: PropTypes.string
  })
};

export default compose(
  graphql(BORROW_ITEM_MUTATION, {
    name: "BORROW_ITEM_MUTATION"
  }),
  graphql(RETURN_ITEM_MUTATION, {
    name: "RETURN_ITEM_MUTATION"
  }),
  withStyles(styles)
)(ItemCard);
