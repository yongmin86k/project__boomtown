import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { ItemsGrid } from "../../components";
import styles from "./styles";
// Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico"
const Profile = ({ classes, userInfo }) => {
  return (
    <Container
      component="section"
      maxWidth={false}
      className={classes.pageProfile}
    >
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.gridProfile}>
            <CardHeader
              className={classes.cardProfileContent}
              avatar={
                userInfo.userimageurl ? (
                  <Avatar alt={userInfo.fullname} src={userInfo.userimageurl} />
                ) : (
                  <Avatar className={classes.avatar}>
                    {userInfo.fullname.slice(0, 1).toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <Typography variant="h4" component="h2" color="textSecondary">
                  {userInfo.fullname}
                </Typography>
              }
            />
            <CardContent className={classes.cardProfileContent}>
              <Typography variant="h6" component="p">
                {userInfo.items ? userInfo.items.length : 0} Items shared{" "}
                {userInfo.borrowed ? userInfo.borrowed.length : 0} Items
                borrowed
              </Typography>
              <Typography component="p">
                {userInfo.bio ? userInfo.bio : `"No bio provided."`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {userInfo.items ? (
        <ProfileItems
          classes={classes}
          title={"Shared Items"}
          items={userInfo.items}
        />
      ) : (
        ``
      )}
      {userInfo.borrowed ? (
        <ProfileItems
          classes={classes}
          title={"Borrowed Items"}
          items={userInfo.borrowed}
        />
      ) : (
        ``
      )}
    </Container>
  );
};

const ProfileItems = ({ classes, items, title }) => (
  <Fragment>
    <Grid container>
      <Typography
        className={classes.gridProfileHeader}
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
      >
        {title}
      </Typography>
    </Grid>
    <ItemsGrid items={items} />
  </Fragment>
);

export default withStyles(styles)(Profile);
