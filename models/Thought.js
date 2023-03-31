const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// import date format from utils once written

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'you must write something',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // format this
            get: timestamp => timestamp,
        },
        username: { 
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

thoughtSchema
  .virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;