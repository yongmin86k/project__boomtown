const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    items({ id }, args, { pgResource }, info) {
      try {
        const items = pgResource.getItemsForUser(id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    borrowed({ id }, args, { pgResource }, info) {
      try {
        const items = pgResource.getBorrowedItemsForUser(id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  },

  Item: {
    async itemowner({ itemowner }, args, { pgResource }, info) {
      try {
        const itemownerUser = pgResource.getUserById(itemowner);
        return itemownerUser;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async tags({ id }, args, { pgResource }, info) {
      try {
        const tags = pgResource.getTagsForItem(id);
        return tags;
      } catch (e) {
        throw new ApolloError(e);
      }
    },
    async borrower({ borrower }, args, { pgResource }, info) {
      try {
        if (borrower) {
          const borrowUser = pgResource.getUserById(borrower);
          return borrowUser;
        } else {
          return null;
        }
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  }
};

module.exports = relationResolvers;
