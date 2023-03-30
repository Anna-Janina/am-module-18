const { Schema, model } = require('mongoose');
// const Reaction = require('./Reaction');

const reactionSchema = new Schema(
    {
        reactionId: {
            // Use Mongoose's ObjectId data type,
            // Default value is set to a new ObjectId,
        },
        reactionBody: {
            // String,
            // Required,
            // 280 character maximum,
        },
        username: {
            // String,
            // Required,
        },
        createdAt: {
            // Date,
            // Set default value to the current timestamp,
            // Use a getter method to format the timestamp on query,
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

// This will not be a model, but rather will be used as the "reaction" field's subdocument schema in the "Thought" model.

module.exports = reactionSchema;