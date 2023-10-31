//Khai báo thư viện express:
const express = require("express");

//Khai báo thư viện mongoose:
const mongoose = require('mongoose');
// khai báo cors
const cors = require('cors');


//Khai báo app
const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.Router())
// const appRouter = express.Router();

//Khai báo port
const port = 8000;

// khai báo model
const userModel = require("./app/models/userModel");
const diceHistoryModel = require("./app/models/diceModel");
const voucherModel = require("./app/models/voucherModel");
const prizeModel = require("./app/models/prizeModel");
const prizeHistoriesModel = require("./app/models/prizeHistoryModel")
const voucherHistoriesModel = require("./app/models/voucherHistoryModel")

// khai báo Router
const { userRouter } = require("./app/routers/userRouter");
const { diceHistoryRouter } = require("./app/routers/diceHistoryRouter");
const { prizeRouter } = require("./app/routers/prizeRouter");
const { voucherRouter } = require("./app/routers/voucherRouter");
const { prizeHistoryRouter } = require("./app/routers/prizeHistoryRouter");
const { voucherHistoryRouter } = require("./app/routers/voucherHistoryRouter");
//kết nối mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lucky_dice_nodejs")
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch(error => handleError(error));
//Khởi động app:
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
// middlewares

    // print current time
// app.use((req, res, next) => {
//     const time = new Date().toLocaleString();
//     console.log('Time: ', time);
//     next();
// });
    // print request method
// app.use((req, res, next) => {
//     console.log('Request Type: ', req.method);
//     next();
// });
// treat publics folder static
app.use(express.static(__dirname + '/publics'));


// app sendFile html
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/publics/index.html");
})



// user router
app.use("/users", cors(), userRouter);
app.use("/dice-histories", cors(), diceHistoryRouter)
app.use("/prizes", cors(), prizeRouter);
app.use("/vouchers",cors(),  voucherRouter);
app.use("/prize-histories",cors(),  prizeHistoryRouter);
app.use("/voucher-histories",cors(),  voucherHistoryRouter);

// execute: draw a dice
const luckyDiceRouter = require('express').Router();
app.use("/lucky-dice", cors(), luckyDiceRouter);
const {createDice, getDiceHistoryByQuery, getVoucherHistoryByQuery, getPrizeHistoryByQuery} = require("./app/controllers/diceController")
luckyDiceRouter.post("/dice",cors(), createDice)
luckyDiceRouter.get("/dice-history",cors(), getDiceHistoryByQuery)
luckyDiceRouter.get("/voucher-history" ,cors(), getVoucherHistoryByQuery)
luckyDiceRouter.get("/prize-history",cors(), getPrizeHistoryByQuery)


