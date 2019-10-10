const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {

    items({id}, args, {pgResource}, info) {
      try {
        const items = pgResource.getItemsForUser(id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    borrowed({id}, args, {pgResource}, info) {
      try {
        const items = pgResource.getBorrowedItemsForUser(id);
        return items;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
    
  },

  Item: {
    async itemowner({ownerID}, args, {pgResource}, info) {
      try {
        const itemowner = pgResource.getUserById(ownerID);
        return itemowner;
      } catch(e) {
        throw new ApolloError(e);
      }
    },
    async tags({id}, args, {pgResource}, info) {
      try {
        const tags = pgResource.getTagsForItem(id);
        return tags;
      } catch(e) {
        throw new ApolloError(e);
      }
    },
    async borrower({borrowerID}, args, {pgResource}, info) {
      try {
        if (parent.borrower) {
          const borrower = pgResource.getUserById(borrowerID);
          return borrower;
        } else {
          return null;
        }
      } catch(e) {
        throw new ApolloError(e);
      }
    }
  },
};

module.exports = relationResolvers;