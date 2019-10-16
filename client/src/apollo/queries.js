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

// export const ALL_ITEMS_QUERY = gql`
//   query items($filter: ID) {
//     # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
//   }
//   ${ItemFields}
// `;

// export const ALL_USER_ITEMS_QUERY = gql`
//   query user($id: ID!) {
//     # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
//     # Use the ItemFields fragment for the items and borrowed fields.
//   }
//   ${ItemFields}
// `;

// export const ALL_TAGS_QUERY = gql`
//   query {
//     # @TODO: Query the id and title fields for tags.
//   }
// `;

// export const ADD_ITEM_MUTATION = gql`
//   mutation addItem($item: NewItemInput!) {
//     # @TODO: Pass the item and image into the addItem mutation as arguments
//     # and return the new item id when the mutation is complete.
//   }
// `;

// /**
//  * Auth-related queries and mutations.
//  */

// export const VIEWER_QUERY = gql`
//   query {
//     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
//   }
// `;
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `;

// export const SIGNUP_MUTATION = gql`
//   mutation signup($user: SignupInput!) {
//     # @TODO: Pass the user into the signup mutation as an argument
//     # and return the token and user id.
//   }
// `;

// export const LOGIN_MUTATION = gql`
//   mutation login($user: LoginInput!) {
//     # @TODO: Pass the user into the login mutation as an argument
//     # and return the token and user id.
//   }
// `;
