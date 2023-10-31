const voucherRouter = require('express').Router();

const  {
    getAllVouchersMiddleware,
    getVoucherMiddleWare,
    postVoucherMiddleWare,
    putVoucherMiddleWare,
    deleteVoucherMiddleWare
} = require('../middlewares/voucherMiddleware');

const {
    createVoucher, getAllVouchers, getVoucherById, updateVoucher, deleteVoucher
} = require('../controllers/voucherController');

voucherRouter.get('/', getAllVouchersMiddleware, getAllVouchers);
voucherRouter.get('/:voucherId', getVoucherMiddleWare, getVoucherById);
voucherRouter.put('/:voucherId', putVoucherMiddleWare, updateVoucher);
voucherRouter.delete('/:voucherId', deleteVoucherMiddleWare, deleteVoucher);
voucherRouter.post('/', postVoucherMiddleWare, createVoucher);

module.exports = {voucherRouter};
    