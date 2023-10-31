const voucherHistoryRouter = require('express').Router();

const  {
    getAllVoucherHistoriesMiddleware,
    getVoucherHistoryMiddleWare,
    postVoucherHistoryMiddleWare,
    putVoucherHistoryMiddleWare,
    deleteVoucherHistoryMiddleWare
} = require('../middlewares/voucherHistoryMiddleware');

const {
    createVoucherHistory, getAllVoucherHistories, getVoucherHistoryById, updateVoucherHistory, deleteVoucherHistory
} = require('../controllers/voucherHistoryController');

voucherHistoryRouter.get('/', getAllVoucherHistoriesMiddleware, getAllVoucherHistories);
voucherHistoryRouter.get('/:voucherHistoryId', getVoucherHistoryMiddleWare, getVoucherHistoryById);
voucherHistoryRouter.put('/:voucherHistoryId', putVoucherHistoryMiddleWare, updateVoucherHistory);
voucherHistoryRouter.delete('/:voucherHistoryId', deleteVoucherHistoryMiddleWare, deleteVoucherHistory);
voucherHistoryRouter.post('/', postVoucherHistoryMiddleWare, createVoucherHistory);

module.exports = {voucherHistoryRouter};
    