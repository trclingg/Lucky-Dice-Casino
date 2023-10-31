const getAllVouchersMiddleware = (req, res, next) => {
    console.log(`Console: Get all vouchers`);
    next();
}

const getVoucherMiddleWare = (req, res, next) => {
    let voucherId = req.params.voucherId
    console.log(`Console: Get voucher with id ${voucherId}`)
    next()
}

const postVoucherMiddleWare = (req, res, next) => {
    console.log(`Console: Create new voucher`)
    next()
}

const putVoucherMiddleWare = (req, res, next) => {
    let voucherId = req.params.voucherId
    console.log(`Console: Update voucher with id ${voucherId}`)
    next()
}

const deleteVoucherMiddleWare = (req, res, next) => {
    let voucherId = req.params.voucherId
    console.log(`Console: Delete voucher with id ${voucherId}`)
    next()
}

module.exports = {
    getAllVouchersMiddleware,
    getVoucherMiddleWare,
    postVoucherMiddleWare,
    putVoucherMiddleWare,
    deleteVoucherMiddleWare
}