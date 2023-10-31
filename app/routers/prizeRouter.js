const prizeRouter = require('express').Router();

const  {
    getAllPrizesMiddleware,
    getPrizeMiddleWare,
    postPrizeMiddleWare,
    putPrizeMiddleWare,
    deletePrizeMiddleWare
} = require('../middlewares/prizeMiddleware');

const {
    createPrize, getAllPrizes, getPrizeById, updatePrize, deletePrize
} = require('../controllers/prizeController');

prizeRouter.get('/', getAllPrizesMiddleware, getAllPrizes);
prizeRouter.get('/:prizeId', getPrizeMiddleWare, getPrizeById);
prizeRouter.put('/:prizeId', putPrizeMiddleWare, updatePrize);
prizeRouter.delete('/:prizeId', deletePrizeMiddleWare, deletePrize);
prizeRouter.post('/', postPrizeMiddleWare, createPrize);

module.exports = {prizeRouter};
    