const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');


// /api/users GET all and POST 
router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId GET single user, PUT and DELETE by its _id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE a friendby Id
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);


module.exports = router;