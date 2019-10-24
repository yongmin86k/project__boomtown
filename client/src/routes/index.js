import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MenuBar, PrivateRoute } from "../components";
import { Home, Items, Profile, Share } from "../pages";
import { ViewerContext } from "../context/ViewerProvider";

const AppRoutes = () => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => {
        if (!viewer) {
          return (
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
        return (
          <Fragment>
            <MenuBar />
            <Switch>
              <PrivateRoute exact path="/share" component={Share} />
              <PrivateRoute exact path="/items" component={Items} />
              <PrivateRoute exact path="/profile/:userid" component={Profile} />
              <PrivateRoute exact path="/profile" component={Profile} />

              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }}
    </ViewerContext.Consumer>
  );
};

export default AppRoutes;
