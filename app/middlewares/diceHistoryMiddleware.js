const getAllDiceHistoriesMiddleware = (req, res, next) => {
    console.log(`Console: Get all diceHistories`);
    next();
}

const getDiceHistoryMiddleWare = (req, res, next) => {
    let diceHistoryId = req.params.diceHistoryId
    console.log(`Console: Get diceHistory with id ${diceHistoryId}`)
    next()
}

const postDiceHistoryMiddleWare = (req, res, next) => {
    console.log(`Console: Create new diceHistory`)
    next()
}

const putDiceHistoryMiddleWare = (req, res, next) => {
    let diceHistoryId = req.params.diceHistoryId
    console.log(`Console: Update diceHistory with id ${diceHistoryId}`)
    next()
}

const deleteDiceHistoryMiddleWare = (req, res, next) => {
    let diceHistoryId = req.params.diceHistoryId
    console.log(`Console: Delete diceHistory with id ${diceHistoryId}`)
    next()
}

module.exports = {
    getAllDiceHistoriesMiddleware,
    getDiceHistoryMiddleWare,
    postDiceHistoryMiddleWare,
    putDiceHistoryMiddleWare,
    deleteDiceHistoryMiddleWare
}