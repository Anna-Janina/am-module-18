// Double check this
const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Date,
            // Set default value to the current timestamp,
            // Use a getter method to format the timestamp on query,
        },
        // (The user that created this thought)
        username: { 
            type: String,
            required: true,
        },
        // (These are like replies)
        reactions: {
            // Array of nested documents created with the 'reactionSchema'
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);


// Create a virtual called "reactionCount" that retrieves the length of the thought's "reactions" array field on query.

// DOUBLE CHECK THIS
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });


module.exports = thoughtSchema;