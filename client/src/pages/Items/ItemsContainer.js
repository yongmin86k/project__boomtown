import React, { Component } from "react";
import Items from "./Items";
import FullScreenLoader from "../../components/FullScreenLoader";

import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `${error}`;

          return <Items items={data.items} />;
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
