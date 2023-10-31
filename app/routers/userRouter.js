const userRouter = require('express').Router();

const  {
    getAllUsersMiddleware,
    getUserMiddleWare,
    postUserMiddleWare,
    putUserMiddleWare,
    deleteUserMiddleWare
} = require('../middlewares/userMiddleware');

const {
    createUser, getAllUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');

userRouter.get('/', getAllUsersMiddleware, getAllUsers);
userRouter.get('/:userId', getUserMiddleWare, getUserById);
userRouter.put('/:userId', putUserMiddleWare, updateUser);
userRouter.delete('/:userId', deleteUserMiddleWare, deleteUser);
userRouter.post('/', postUserMiddleWare, createUser);

module.exports = {userRouter};
    