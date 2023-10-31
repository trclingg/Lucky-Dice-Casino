const diceHistoryRouter = require('express').Router();

const  {
    getAllDiceHistoriesMiddleware,
    getDiceHistoryMiddleWare,
    postDiceHistoryMiddleWare,
    putDiceHistoryMiddleWare,
    deleteDiceHistoryMiddleWare
} = require('../middlewares/diceHistoryMiddleware');

const {
    createDiceHistory, getAllDiceHistories, getDiceHistoryById, updateDiceHistory, deleteDiceHistory
} = require('../controllers/diceHistoryController');

diceHistoryRouter.get('/', getAllDiceHistoriesMiddleware, getAllDiceHistories);
diceHistoryRouter.get('/:diceHistoryId', getDiceHistoryMiddleWare, getDiceHistoryById);
diceHistoryRouter.put('/:diceHistoryId', putDiceHistoryMiddleWare, updateDiceHistory);
diceHistoryRouter.delete('/:diceHistoryId', deleteDiceHistoryMiddleWare, deleteDiceHistory);
diceHistoryRouter.post('/', postDiceHistoryMiddleWare, createDiceHistory);

module.exports = {diceHistoryRouter};
    