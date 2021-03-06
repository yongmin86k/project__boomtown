function tagsQueryString(tags, result) {
  for (i = 0; i < tags.length; i++) {
    result += `((select id from new_item), $${i + 6}),`;
  }
  return result.slice(0, -1);
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: `INSERT INTO users(fullname, email, password) VALUES($1, $2, $3) RETURNING *`,
        values: [fullname, email, password]
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
        text: `SELECT * FROM users WHERE email=$1`,
        values: [email]
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
          text: `SELECT id, email, fullname, bio, userimageurl FROM users WHERE id=$1`,
          values: [id]
        };
        const user = await postgres.query(findUserQuery);

        if (user.rows.length > 0) {
          return user.rows[0];
        } else {
          throw "User is not found";
        }
      } catch (e) {
        throw e;
      }
    },
    async getItemByID(id) {
      try {
        const item = await postgres.query({
          text: `SELECT * FROM items WHERE id = $1`,
          values: [id]
        });
        if (item.rows.length > 0) {
          return item.rows[0];
        } else {
          throw `Item ID ${id} is not found`;
        }
      } catch (e) {
        throw e;
      }
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner <> $1`,
          values: idToOmit ? [idToOmit] : [""]
        });

        if (items.rows.length > 0) {
          return items.rows;
        } else {
          throw "Items are not found";
        }
      } catch (e) {
        throw e;
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner = $1`,
          values: [id]
        });
        if (items.rows.length > 0) {
          return items.rows;
        } else {
          return null;
          // throw "Owned items are not found";
        }
      } catch (e) {
        throw e;
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrower = $1`,
          values: [id]
        });
        if (items.rows.length > 0) {
          return items.rows;
        } else {
          return null;
          // throw "Burrowed items are not found";
        }
      } catch (e) {
        throw e;
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query("SELECT * FROM tags");
        if (tags.rows.length > 0) {
          return tags.rows;
        } else {
          return null;
          // throw 'Tags are not found'
        }
      } catch (e) {
        throw e;
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT A.id, A.title FROM itemtags
          INNER JOIN tags AS A
          ON A.id = tagid
          WHERE itemid = $1;`,
          values: [id]
        };
        const tags = await postgres.query(tagsQuery);
        if (tags.rows.length > 0) {
          return tags.rows;
        } else {
          return null;
          // throw 'Tags are not found'
        }
      } catch (e) {
        throw e;
      }
    },
    async saveNewItem({ item, user }) {
      try {
        const { title, description, tags, imageurl } = item;
        const tagRelationQuery = await tagsQueryString(tags, "");
        const ArrayTagId = tags.map(tag => {
          return tag.id;
        });
        const dateNow = new Date();
        const newItemQuery = {
          text: `WITH new_item AS ( 
                  INSERT INTO items(title, description, itemowner, imageurl, created) 
                  VALUES ($1, $2, $3, $4, $5) 
                  RETURNING *
                  ), new_relation AS ( 
                  INSERT INTO itemtags(itemid, tagid) 
                    VALUES ${tagRelationQuery}
                  ) SELECT * FROM new_item`,
          values: [title, description, user.id, imageurl, dateNow].concat(
            ArrayTagId
          )
        };
        const new_item = await postgres.query(newItemQuery);
        return new_item.rows[0];
      } catch (e) {
        throw e;
      }
    }, // end async saveNewItem()

    async borrowNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const itemID = item.id;
              const userID = user.id;

              const updateItemQuery = {
                text: `UPDATE items SET borrower = $1 WHERE id = $2`,
                values: [userID, itemID]
              };

              await postgres.query(updateItemQuery);

              const itemQuery = {
                text: `SELECT * FROM items WHERE id = $1`,
                values: [itemID]
              };

              const updateItem = await postgres.query(itemQuery);

              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(updateItem.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    },
    async returnTheItem({ item }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const itemID = item.id;

              const updateItemQuery = {
                text: `UPDATE items SET borrower = $1 WHERE id = $2`,
                values: [null, itemID]
              };

              await postgres.query(updateItemQuery);

              const itemQuery = {
                text: `SELECT * FROM items WHERE id = $1`,
                values: [itemID]
              };

              const updateItem = await postgres.query(itemQuery);

              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(updateItem.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
