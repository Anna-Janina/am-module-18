const { User, Thought } = require('../models');


const userController = {
    // getUser
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((userData) => {
                res.json(userData)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(error)
            });
    },
    // getSingleUser
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.studentId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((userData) => {
                if (!userData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(userData);
        })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        )
            .then((userData) =>
                !user
                ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
                : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) =>
                !user
                ? res.status(404).json({ message: 'No such user exists' })
                : Course.findOneAndUpdate(
              { students: req.params.studentId },
              { $pull: { students: req.params.studentId } },
              { new: true }
            ))
            .then((course) =>
                !course
                ? res.status(404).json({
                message: 'User deleted, but no courses found',
                })
                : res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // addFriend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // deleteFriend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = userController;
