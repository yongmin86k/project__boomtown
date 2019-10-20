import React, { Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { MenuBar } from "../components";
import { Home, Items, Profile, Share } from "../pages";

const mainRoutes = ({ location }) => {
  return (
    <Fragment>
      {location.pathname !== "/welcome" ? <MenuBar /> : ``}

      <Switch>
        <Route exact path="/welcome" component={Home} />
        <Route path="/share" component={Share} />
        <Route path="/items" component={Items} />
        <Route path="/profile/:userid" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Redirect from="*" to="/items" />

        {/**
         *
         * Later, we'll add logic to send users to one set of routes if they're logged in,
         * or only view the /welcome page if they are not.
         */}
      </Switch>
    </Fragment>
  );
};

export default withRouter(mainRoutes);
