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
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId })

            if (!userData) {
                return res.status(404).json({message: 'no user with this id was foiund'})
            }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
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
