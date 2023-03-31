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
    
    

    
// updateThought,
// deleteThought,
// createReaction,
// deleteReaction,
}




module.exports = thoughtController;