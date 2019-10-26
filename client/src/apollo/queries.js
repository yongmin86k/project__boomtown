import gql from "graphql-tag";

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      email
      fullname
      bio
    }
    borrower {
      id
      email
      fullname
      bio
    }
  }
`;

// QUERY :: an item by its id
export const ITEM_QUERY = gql`
  query getItem($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

// QUERY :: all items filtered by userID
export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

// QUERY :: all items by userID
export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      fullname
      bio
      email
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

// QUERY :: all tags
export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

// MUTATION :: add item with tags
export const ADD_ITEM_MUTATION = gql`
  mutation addItem(
    $title: String!
    $description: String!
    $imageurl: String
    $tags: [AssignedTag]!
  ) {
    addItem(
      input: {
        title: $title
        description: $description
        imageurl: $imageurl
        tags: $tags
      }
    ) {
      title
      description
      imageurl
      tags {
        id
        title
      }
    }
  }
`;

// /**
//  * Auth-related queries and mutations.
//  */
export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignUpInput!) {
    signup(user: $user) {
      token
      user {
        id
        email
        fullname
        bio
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
        email
        fullname
        bio
      }
    }
  }
`;
