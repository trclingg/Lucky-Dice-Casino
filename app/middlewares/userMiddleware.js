const getAllUsersMiddleware = (req, res, next) => {
    console.log(`Console: Get all users`);
    next();
}

const getUserMiddleWare = (req, res, next) => {
    let userId = req.params.userId
    console.log(`Console: Get user with id ${userId}`)
    next()
}

const postUserMiddleWare = (req, res, next) => {
    console.log(`Console: Create new user`)
    next()
}

const putUserMiddleWare = (req, res, next) => {
    let userId = req.params.userId
    console.log(`Console: Update user with id ${userId}`)
    next()
}

const deleteUserMiddleWare = (req, res, next) => {
    let userId = req.params.userId
    console.log(`Console: Delete user with id ${userId}`)
    next()
}

module.exports = {
    getAllUsersMiddleware,
    getUserMiddleWare,
    postUserMiddleWare,
    putUserMiddleWare,
    deleteUserMiddleWare
}