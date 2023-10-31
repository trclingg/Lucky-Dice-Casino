const prizeHistoryRouter = require('express').Router();

const  {
    getAllPrizeHistoriesMiddleware,
    getPrizeHistoryMiddleWare,
    postPrizeHistoryMiddleWare,
    putPrizeHistoryMiddleWare,
    deletePrizeHistoryMiddleWare
} = require('../middlewares/prizeHistoryMiddleware');

const {
    createPrizeHistory, getAllPrizeHistories, getPrizeHistoryById, updatePrizeHistory, deletePrizeHistory
} = require('../controllers/prizeHistoryController');

prizeHistoryRouter.get('/', getAllPrizeHistoriesMiddleware, getAllPrizeHistories);
prizeHistoryRouter.get('/:prizeHistoryId', getPrizeHistoryMiddleWare, getPrizeHistoryById);
prizeHistoryRouter.put('/:prizeHistoryId', putPrizeHistoryMiddleWare, updatePrizeHistory);
prizeHistoryRouter.delete('/:prizeHistoryId', deletePrizeHistoryMiddleWare, deletePrizeHistory);
prizeHistoryRouter.post('/', postPrizeHistoryMiddleWare, createPrizeHistory);

module.exports = {prizeHistoryRouter};
    