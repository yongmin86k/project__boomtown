const { gql } = require("apollo-server-express");

/**
 *  @TODO: Boomtown Schema
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`
  # scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: String
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]
  }

  type Query {
    user(id: ID!): User
    viewer: User
    item(id: ID!): Item
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    signup: Boolean
    login: Boolean
    logout: Boolean
    addItem(input: NewItemInput!): Item
  }
`;
