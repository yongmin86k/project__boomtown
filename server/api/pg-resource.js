function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: "", // @TODO: Authentication - Server
        values: [fullname, email, password],
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "", // @TODO: Authentication - Server
        values: [email],
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      
      try {
        const findUserQuery = {
          text: `SELECT id, email, fullname, bio FROM users WHERE id=$1`,
          values: [id],
        };
        const user = await postgres.query(findUserQuery);
        
        if (user.rows.length > 0 ) {
          return user.rows[0];
        } else  {
          throw 'User is not found'
        }
      }
      catch(e) {
        throw e
      }

      /**
       *  Refactor the following code using the error handling logic described above.
       *  When you're done here, ensure all of the resource methods in this file
       *  include a try catch, and throw appropriate errors.
       *
       *  Ex: If the user is not found from the DB throw 'User is not found'
       *  If the password is incorrect throw 'User or Password incorrect'
       */

      // -------------------------------
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner <> $1`,
          values: idToOmit ? [idToOmit] : [''],
        });

        if (items.rows.length > 0) {
          return items.rows;
        } else {
          throw 'Items are not found'
        }
      } catch(e) {
        throw e
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner = $1`,
          values: [id],
        });
        if ( items.rows.length > 0 ){
          return items.rows;
        } else {
          throw 'Owned items are not found'
        }
      } catch(e) {
        throw e
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrower = $1`,
          values: [id],
        });
        if ( items.rows.length > 0 ){
          return items.rows;
        } else {
          throw 'Burrowed items are not found'
        }
      } catch(e) {
        throw e
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        if ( tags.rows.length > 0 ) {
          return tags.rows;
        } else {
          throw null
          // throw 'Tags are not found'
        }
      } catch(e) {
        throw e
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT A.id, A.title FROM itemtags
          INNER JOIN tags AS A
          ON A.id = tagid
          WHERE itemid = $1;`,
          values: [id],
        };
        const tags = await postgres.query(tagsQuery);
        if ( tags.rows.length > 0 ) {
          return tags.rows;
        } else {
          return null;
          // throw 'Tags are not found'
        }
      } catch(e) {
        throw e
      }
    },
    async saveNewItem({ item, user }) {

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query("BEGIN", async err => {
              
              const { title, description, tags } = item;
              
              // Generate new Item query
              const newItemQuery = {
                text: `INSERT INTO items(title, description, itemowner) VALUES($1, $2, $3) RETURNING *;`,
                values: [title, description, user]
              };
              
              // Insert new Item
              const newItem = await postgres.query(newItemQuery);
              
              // Generate tag relationships query
              const itemid = newItem.rows[0].id;
              const tagRelationQuery = await tagsQueryString(tags, itemid, "");
              const ArrayTagId = tags.map( tag => { return tag.id});
              const newTagQuery = {
                text: `INSERT INTO itemtags(tagid, itemid) VALUES${tagRelationQuery}`,
                values: ArrayTagId
              };

              // Insert tags
              await postgres.query(newTagQuery);

              // Commit the entire transaction!
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0])
              });
            });
          } catch (e) {
            // Something went wrong
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      }); // end new Promise()
    },
  };
};
