const mongoose = require("mongoose");
const diceHistoryModel = require('../models/diceModel');
const prizeModel = require("../models/prizeModel");
const prizeHistoryModel = require("../models/prizeHistoryModel");
const userModel = require("../models/userModel");
const voucherModel = require("../models/voucherModel");
const voucherHistoryModel = require("../models/voucherHistoryModel");
const { json } = require("body-parser");



let createDice = async (req, res) => {

    const vDiceDataObj = {
        voucher: {},
        dice: 0,
        prize: {}
    }
    // B1: collect data
    let userNameInput = req.body.username;
    let firstNameInput = req.body.firstname;
    let lastNameInput = req.body.lastname;
    //B2.1: validate all user data:
    if (!firstNameInput) {
        return res.status(400).json({
            status: `Bad request`,
            message: `Firstname is required !`
        })
    }
    if (!lastNameInput) {
        return res.status(400).json({
            status: `Bad request`,
            message: `Lastname is required !`
        })
    }
    if (!userNameInput) {
        return res.status(400).json({
            status: `Bad request`,
            message: `Username is required !`
        })
    }

    // B2.2: check if username exists)
    let validUsername = false;
    let userMatch = await userModel.findOne({ username: userNameInput });
    //  if exists
    if (userMatch) {
        validUsername = true;
    }
    console.log("existed user? ", validUsername)
    // PART 1: OLD USER GAME
    // B3.1 : if username exists, create dice history
    if (validUsername) {
        let userId = userMatch.id
        let userLastname = userMatch.lastname
        let vNewDiceHistoryData = await {
            user: userId,
            lastname: userLastname
        }
        const response = await fetch(

            "http://localhost:8000/dice-histories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(vNewDiceHistoryData)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
        const data = await response.json()
        console.log("Successfully create a new dice history for old user")
        console.log(`Dice number (out of 6): ${data.data.dice}`)
        // B3.2: check dice result
        if (data.data.dice <= 3) {
            console.log("dice <= 3")
            vDiceDataObj.voucher = null;
            vDiceDataObj.dice = data.data.dice;
            vDiceDataObj.prize = null;
        }
        else {
            //Nếu dice ra > 3 thì random 1 voucher từ voucherModel
            console.log("dice > 3")
            //   get tổng số lượng voucher từ voucher model
            const voucherCount = await voucherModel.count();
            //lấy random 1 số từ số tổng voucher
            const random = await Math.floor(Math.random() * voucherCount);

            //lấy 1 voucher random từ voucherModel
            const voucherRandom = await voucherModel.findOne().skip(random);

            //truyền dữ liệu voucher random có được vào dữ liệu của DiceDataObj
            vDiceDataObj.voucher = voucherRandom;
            vDiceDataObj.dice = data.data.dice;

            //Thêm 1 bản ghi mới vào voucher history
            const vVoucherHistoryDataObj = {
                _id: new mongoose.Types.ObjectId,
                user: userId,
                voucher: voucherRandom._id
            }
            voucherHistoryModel.create(vVoucherHistoryDataObj)
            console.log("Successfully create new voucher history with user id and voucher")

        }
        //lấy 3 lần gieo xúc xắc gần nhất của User:
        const userLast3Dices = await diceHistoryModel.find({ user: userId }).sort({ _id: '-1' }).limit(3)
        // console.log(userLast3Dices)
        if (userLast3Dices.length >= 3 && userLast3Dices[0].dice > 3 && userLast3Dices[1].dice > 3 && userLast3Dices[2].dice > 3) {
            //lấy random 1 prize từ prizeModel

            //   get tổng số lượng prize từ prize model
            const prizeCount = await prizeModel.count();

            //lấy random 1 số từ số tổng prize
            const random = await Math.floor(Math.random() * prizeCount);

            //lấy 1 prize random từ prizeModel
            const prizeRandom = await prizeModel.findOne().skip(random);

            //truyền dữ liệu prize random có được vào dữ liệu của DiceDataObj
            vDiceDataObj.prize = prizeRandom;

            //Thêm 1 bản ghi mới vào prize history
            const vPrizeHistoryDataObj = {
                _id: new mongoose.Types.ObjectId,
                user: userId,
                prize: prizeRandom._id
            }
            prizeHistoryModel.create(vPrizeHistoryDataObj)
            console.log("Successfully create new prize history with user id and prize")
        } else {
            console.log("3 most recent games are not > 3")

            vDiceDataObj.prize = null;


        }
        return res.status(200).json({
            diceResult: vDiceDataObj
        })



    }

    else {
        // PART 2: NEW USER GAME
        // // else username doesnt exist, create user, then create dice history
        let vNewUserData = new userModel({
            _id: new mongoose.Types.ObjectId(),
            username: userNameInput,
            lastname: lastNameInput,
            firstname: firstNameInput
        })
        try {
            let newUserCreated = await userModel.create(vNewUserData);

            console.log("Succesfully created new user,next is to create dice history")
            if (newUserCreated) {
                // find id and last name of the last created user
                let userMatch = await userModel.findOne({ username: userNameInput });
                console.log("userMatch", userMatch)

                let userId = userMatch.id
                let userLastname = userMatch.lastname
                let userObj = await {
                    user: userId,
                    lastname: userLastname
                }
                const response = await fetch(

                    "http://localhost:8000/dice-histories",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userObj)
                    })
                    .catch((error) => {
                        console.log("Error:", error)
                    })
                const data = await response.json()
                // console.log(data)
                console.log("Successfully create a new dice history for old user")

                console.log(`Dice number (out of 6): ${data.data.dice}`)
                // B3.2: check dice result
                if (data.data.dice <= 3) {
                    console.log("dice <= 3")
                    vDiceDataObj.voucher = null;
                    vDiceDataObj.dice = data.data.dice;
                    vDiceDataObj.prize = null;
                }
                else {
                    //Nếu dice ra > 3 thì random 1 voucher từ voucherModel
                    console.log("dice > 3")
                    //   get tổng số lượng voucher từ voucher model
                    const voucherCount = await voucherModel.count();
                    //lấy random 1 số từ số tổng voucher
                    const random = await Math.floor(Math.random() * voucherCount);

                    //lấy 1 voucher random từ voucherModel
                    const voucherRandom = await voucherModel.findOne().skip(random);

                    //truyền dữ liệu voucher random có được vào dữ liệu của DiceDataObj
                    vDiceDataObj.voucher = voucherRandom;
                    vDiceDataObj.dice = data.data.dice;

                    //Thêm 1 bản ghi mới vào voucher history
                    const vVoucherHistoryDataObj = {
                        _id: new mongoose.Types.ObjectId,
                        user: userId,
                        voucher: voucherRandom._id
                    }
                    voucherHistoryModel.create(vVoucherHistoryDataObj)
                    console.log("Successfully create new voucher history with user id and voucher")

                }
                return res.status(200).json({
                    diceResult: vDiceDataObj
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                message: 'error when create users and create dice history',
                error: error.message
            })
        }

    }
}


// get diceHistory by query
const getDiceHistoryByQuery = async (req, res) => {
    try {
        // collect data from client
        let usernameHistory = req.query.username;
        // validate
        if (!usernameHistory) {
            return res.status(400).json({
                message: 'username is required'
            })
        }
        // let userIdDetect = String;
        let userIdFound = await userModel.find({ username: usernameHistory })
        let condition = {
        }
        if (userIdFound) {
            userIdFound = userIdFound[0]._id
            condition = {
                user: userIdFound
            }
            // console.log(userIdFound)

        }
        const diceHistoryOfUser = []
        // find diceHistory by id
        let diceHistory = await diceHistoryModel.find(condition);
        if (!diceHistory) {
            return res.status(404).json({
                message: 'diceHistory not found'
            })
        }
        // console.log((diceHistory.length))
        for (let i = 0; i < diceHistory.length; i++) {
            diceHistoryOfUser.push(diceHistory[i].dice)
        }

        return res.status(200).json({
            message: 'get diceHistory by id successfully',
            dices: diceHistoryOfUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get diceHistory by id',
            error: error.message
        })
    }
}

// get diceHistory by query
const getVoucherHistoryByQuery = async (req, res) => {
    try {
        // collect data from client
        let usernameHistory = req.query.username;
        // validate
        if (!usernameHistory) {
            return res.status(400).json({
                message: 'username is required'
            })
        }
        // const voucherHistoryOfUser = []

        let userIdFound = await userModel.find({ username: usernameHistory })
        let condition = {
        }
        if (userIdFound) {
            userIdFound = userIdFound[0]._id
            condition = {
                user: userIdFound
            }

        }
        // find diceHistory by id
        let voucherHistory = await voucherHistoryModel.find(condition);
        if (!voucherHistory) {
            return res.status(404).json({
                message: 'voucherHistory not found'
            })
        }
        // for (let i = 0; i < voucherHistory.length; i++) {
        //     voucherHistoryOfUser.push(voucherHistory)
        // }
        // voucherHistoryOfUser = voucherHistory
        // voucherHistoryOfUser.push(voucherHistory)


        return res.status(200).json({
            message: 'get voucherHistory by id successfully',
            vouchers: voucherHistory
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get voucherHistory by id',
            error: error.message
        })
    }
}

// get diceHistory by query
const getPrizeHistoryByQuery = async (req, res) => {
    try {
        // collect data from client
        let usernameHistory = req.query.username;
        // validate
        if (!usernameHistory) {
            return res.status(400).json({
                message: 'username is required'
            })
        }
        // let userIdDetect = String;
        let userIdFound = await userModel.find({ username: usernameHistory })
        let condition = {
        }
        if (userIdFound) {
            userIdFound = userIdFound[0]._id
            condition = {
                user: userIdFound
            }
            // console.log(userIdFound)

        }
        const prizeHistoryOfUser = []

        // find prizeHistory by id
        let prizeHistory = await prizeHistoryModel.find(condition);
        if (!prizeHistory) {
            return res.status(404).json({
                message: 'prizeHistory not found'
            })
        }
        for (let i = 0; i < prizeHistory.length; i++) {
            let prize = await prizeModel.find({ _id: prizeHistory[i].prize })
            prizeHistoryOfUser.push(prize[0].name)
        }

        return res.status(200).json({
            message: 'get prizeHistory by id successfully',
            prizes: prizeHistoryOfUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get prizeHistory by id',
            error: error.message
        })
    }
}
module.exports = { getDiceHistoryByQuery, createDice, getVoucherHistoryByQuery, getPrizeHistoryByQuery }