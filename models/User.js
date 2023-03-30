// Double check this
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            // String,
            // Unique,
            // Required,
            // Trimmed,
        },
        email: {
            // String,
            // Required,
            // Unique,
            // Must match a valid email address (look into Mongoose's matching validation),
        },
        thoughts: {
            // Array of "_id values referencing the "Thought" model
        },
        friends: {
            // Array of "_id" values referencing the "User" model (self-reference),
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// Create a virtual called "friendCount" that retrieves the length of the user's "friends" array field on query.


// DOUBLE CHECK THIS
// userSchema
//   .virtual('friendCount')
//   // Getter
//   .get(function () {
//     return `${this.first} ${this.last}`;
//   });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;