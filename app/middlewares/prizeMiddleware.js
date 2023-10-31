const getAllPrizesMiddleware = (req, res, next) => {
    console.log(`Console: Get all prizes`);
    next();
}

const getPrizeMiddleWare = (req, res, next) => {
    let prizeId = req.params.prizeId
    console.log(`Console: Get prize with id ${prizeId}`)
    next()
}

const postPrizeMiddleWare = (req, res, next) => {
    console.log(`Console: Create new prize`)
    next()
}

const putPrizeMiddleWare = (req, res, next) => {
    let prizeId = req.params.prizeId
    console.log(`Console: Update prize with id ${prizeId}`)
    next()
}

const deletePrizeMiddleWare = (req, res, next) => {
    let prizeId = req.params.prizeId
    console.log(`Console: Delete prize with id ${prizeId}`)
    next()
}

module.exports = {
    getAllPrizesMiddleware,
    getPrizeMiddleWare,
    postPrizeMiddleWare,
    putPrizeMiddleWare,
    deletePrizeMiddleWare
}