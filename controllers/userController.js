const { User, Thought } = require('../models');


// DOUBLE CHECK THIS PART - Copied from activity
// getUser,
//     getSingleUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     addFriend,
//     deleteFriend,

const userController = {
   // get all users
   getUsers(req, res) {
    User.find()
    .select('-__v')
    .then((userData) => {
        res.json(userData)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json(error)
    })
   }
}

module.exports = userController;
