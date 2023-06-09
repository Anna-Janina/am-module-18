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

    // get single thought by Id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughtData) => {
                if (!thoughtData) {
                  return res.status(404).json({ message: 'No thought with this ID' });
                }
                res.json(thoughtData);
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(error)
            });
    },
      
    // create a Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData } },
                    { new: true }
                );
            })
            .then((userData) =>
                !userData
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
             });
    },

    // updateThought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'No thought with this ID' });
            }
            res.json(thoughtData);
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json(error)
        });
    },

    // deleteThought
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

            if (!thoughtData) {
                return res.status(404).json({message: 'no user thought was found with this id'})
            }

            const dbUserData = User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: {thoughts: req.params.thoughtId}},
                {
                    new: true,
                }
            )

            if (!dbUserData) {
                return res.status(404).json({message: 'thought created but no user found with this id'})
            }

            res.json({ message: 'thought was deleted'})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // createReaction
    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $addToSet: { tags: req.body } }, { runValidators: true, new: true })

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }
        } catch (err) {
                console.log(err)
                res.status(500).json(err)
        }
    },

    // deleteReaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.applicationId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) =>
            !thoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thoughtData)
          )
          .catch((err) => res.status(500).json(err));
      },
    };


module.exports = thoughtController;