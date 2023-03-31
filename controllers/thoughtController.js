const { Thought, User } = require('../models');

const thoughtController = {
        // get ALL thoughts
        getThoughts(req, res) {
            Thought.find()
            .sort({ createdAt: -1 })
            .then((thoughtData) => {
                res.json(thoughtData)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(error)
            })
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
          }
}

module.exports = thoughtController;