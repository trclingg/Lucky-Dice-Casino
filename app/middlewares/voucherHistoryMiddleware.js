const getAllVoucherHistoriesMiddleware = (req, res, next) => {
    console.log(`Console: Get all voucherHistories`);
    next();
}

const getVoucherHistoryMiddleWare = (req, res, next) => {
    let voucherHistoryId = req.params.voucherHistoryId
    console.log(`Console: Get voucherHistory with id ${voucherHistoryId}`)
    next()
}

const postVoucherHistoryMiddleWare = (req, res, next) => {
    console.log(`Console: Create new voucherHistory`)
    next()
}

const putVoucherHistoryMiddleWare = (req, res, next) => {
    let voucherHistoryId = req.params.voucherHistoryId
    console.log(`Console: Update voucherHistory with id ${voucherHistoryId}`)
    next()
}

const deleteVoucherHistoryMiddleWare = (req, res, next) => {
    let voucherHistoryId = req.params.voucherHistoryId
    console.log(`Console: Delete voucherHistory with id ${voucherHistoryId}`)
    next()
}

module.exports = {
    getAllVoucherHistoriesMiddleware,
    getVoucherHistoryMiddleWare,
    postVoucherHistoryMiddleWare,
    putVoucherHistoryMiddleWare,
    deleteVoucherHistoryMiddleWare
}