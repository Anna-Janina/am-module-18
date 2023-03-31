const { Thought, User } = require('../models');


// Mark up from activity - needs to be modified
// NOT DONE YET!!!!

module.exports = {
    // get ALL thought
    getThought(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.error({ message: err });
          return res.status(500).json(err);
        });
    },
    // get single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
//       .populate('tags')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

//     // create getThought
    createThought(req, res) {
      Thought.create(req.body)
//         .then((thought) => res.json(thought))
//         .catch((err) => res.status(500).json(err));
//     },
  };