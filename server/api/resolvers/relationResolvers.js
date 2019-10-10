const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {

    items(parent, args, {pgResource}, info) {
      try {
        const items = pgResource.getItemsForUser(parent.id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    borrowed(parent, args, {pgResource}, info) {
      try {
        const items = pgResource.getBorrowedItemsForUser(parent.id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
    
  },

  Item: {
    async itemowner(parent, args, {pgResource}, info) {
      try {
        const itemowner = pgResource.getUserById(parent.itemowner);
        return itemowner;
      } catch(e) {
        throw new ApolloError(e);
      }
    },
    async tags(parent, args, {pgResource}, info) {
      try {
        const tags = pgResource.getTagsForItem(parent.id);
        return tags;
      } catch(e) {
        throw new ApolloError(e);
      }
    },
    async borrower(parent, args, {pgResource}, info) {
      try {
        if (parent.borrower) {
          const borrower = pgResource.getUserById(parent.borrower);
          return borrower;
        } else {
          return null;
        }
      } catch(e) {
        throw new ApolloError(e);
      }
      /**
       * @TODO: Replace this mock return statement with the correct user from Postgres
       * or null in the case where the item has not been borrowed.
       */
      return null
      // -------------------------------
    }
  },
};

module.exports = relationResolvers;