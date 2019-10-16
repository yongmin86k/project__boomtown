// stateful components

import React, { Component } from "react";
import Items from "./Items";
// import FullScreenLoader from '../../components/FullScreenLoader';

import { Query } from "react-apollo";
import { ITEM_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ITEM_QUERY} variables={{id: 48}}>
        {({ loading, error, data }) => {
          if (loading) return "Loading";
          if (error) return `Error: ${error}`;
          if (data) {
            console.log(data)
            return <Items items={data.items} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
