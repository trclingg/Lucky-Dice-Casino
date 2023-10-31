const getAllPrizeHistoriesMiddleware = (req, res, next) => {
    console.log(`Console: Get all prizeHistories`);
    next();
}

const getPrizeHistoryMiddleWare = (req, res, next) => {
    let prizeHistoryId = req.params.prizeHistoryId
    console.log(`Console: Get prizeHistory with id ${prizeHistoryId}`)
    next()
}

const postPrizeHistoryMiddleWare = (req, res, next) => {
    console.log(`Console: Create new prizeHistory`)
    next()
}

const putPrizeHistoryMiddleWare = (req, res, next) => {
    let prizeHistoryId = req.params.prizeHistoryId
    console.log(`Console: Update prizeHistory with id ${prizeHistoryId}`)
    next()
}

const deletePrizeHistoryMiddleWare = (req, res, next) => {
    let prizeHistoryId = req.params.prizeHistoryId
    console.log(`Console: Delete prizeHistory with id ${prizeHistoryId}`)
    next()
}

module.exports = {
    getAllPrizeHistoriesMiddleware,
    getPrizeHistoryMiddleWare,
    postPrizeHistoryMiddleWare,
    putPrizeHistoryMiddleWare,
    deletePrizeHistoryMiddleWare
}