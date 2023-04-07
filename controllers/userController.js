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
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            // tood, lok into friends and thoughts to add these back in
            // .populate('friends')
            // .populate('thoughts')

            if (!userData) {
                return res.status(404).json({ message: 'no user with this id found'})
            }

            res.json(userData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // updateUser
   async updateUser(req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            {
            _id: req.params.userId,
        },
        {
            $set: req.body
        },
        {
            runValidators: true,
            new: true,
        }
        )

        if (!userData) {
            return res.status(404).json({message: 'no user with this id was found'})
        }

        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
    },

    // deleteUser
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId })

            if (!userData) {
                return res.status(404).json({message: 'no user with this id was found'})
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
