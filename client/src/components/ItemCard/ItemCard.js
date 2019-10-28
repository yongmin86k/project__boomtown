import React from "react";
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

const ItemCard = ({ classes, itemInfo, viewer }) => {
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
        // subheader={itemInfo.created}
        subheader="September 14, 2016"
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
        <Button variant="outlined">Borrow</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ItemCard);
