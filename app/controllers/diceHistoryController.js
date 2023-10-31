const diceHistoryModel = require('../models/diceModel');
const mongoose = require('mongoose');

// get all diceHistories
const getAllDiceHistories = async (req, res) => {
    try {
        let userQuery = req.query.user
        let condition = {
        }
        if (userQuery) {
            condition.user =userQuery
        }
        let diceHistories = await diceHistoryModel.find(condition);
        return res.status(200).json({
            message: 'get all diceHistories successfully',
            data: diceHistories
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all diceHistories',
            error: error.message
        })
    }
}

// get diceHistory by id
const getDiceHistoryById = async (req, res) => {
    try {
        // collect data from client
        let diceHistoryId = req.params.diceHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
            return res.status(400).json({
                message: 'diceHistoryId is invalid'
            })
        }
        // find diceHistory by id
        let diceHistory = await diceHistoryModel.findById(diceHistoryId);
        if (!diceHistory) {
            return res.status(404).json({
                message: 'diceHistory not found'
            })
        }
        return res.status(200).json({
            message: 'get diceHistory by id successfully',
            data: diceHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get diceHistory by id',
            error: error.message
        })
    }
}




// create a diceHistory
const createDiceHistory = async (req, res) => {
    // Cách 1: sử dụng async await
    // take param userId
    // const userId = req.params.userId;
    // B1: collect data from client
    const {
        lastname, user
    } = req.body
    // B2:validate 
    if (!lastname) {
        return res.status(400).json({
            message: 'last name is required'
        })
    }
    if (!user) {
        return res.status(400).json({
            message: 'user id is required'
        })
    }

    // B3: 
    let newDiceHistory = new diceHistoryModel({
        _id: new mongoose.Types.ObjectId(),
        lastname,
        user,
        dice: Math.floor(Math.random() * 6) + 1
    })
    try {
        await diceHistoryModel.create(newDiceHistory);
        return res.status(200).json({
            message: 'create diceHistory successfully',
            data: newDiceHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create diceHistory',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // diceHistoryModel.create(newDiceHistory)
    //     .then(data => res.status(200).json({ message: 'create diceHistory successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create diceHistory', error: error.message }))


}

// update a diceHistory
const updateDiceHistory = async (req, res) => {
    try {
        // collect data from client
        let diceHistoryId = req.params.diceHistoryId;
        const {
            lastname, user
        } = req.body
        // B2:validate 
        if (!lastname) {
            return res.status(400).json({
                message: 'last name is required'
            })
        }
        if (!user) {
            return res.status(400).json({
                message: 'user id is required'
            })
        }

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({
                message: "invalid param user Id"
            })
        }

        if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
            return res.status(400).json({
                message: 'diceHistoryId is invalid'
            })
        }

        let newDiceHistoryData = new diceHistoryModel({
            user,
            lastname,
            dice: Math.floor(Math.random() * 6) + 1
        });
        // find and update diceHistory by id
        let diceHistory = await diceHistoryModel.findByIdAndUpdate(diceHistoryId, newDiceHistoryData);
        if (!diceHistory) {
            return res.status(404).json({
                message: 'diceHistory not found'
            })
        }
        return res.status(200).json({
            message: 'update diceHistory successfully',
            data: diceHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update diceHistory',
            error: error.message
        })
    }
}

// delete a diceHistory
const deleteDiceHistory = async (req, res) => {
    try {
        // collect data from client
        let diceHistoryId = req.params.diceHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
            return res.status(400).json({
                message: 'diceHistoryId is invalid'
            })
        }
        // find and delete diceHistory by id
        let diceHistory = await diceHistoryModel.findByIdAndDelete(diceHistoryId);
        if (!diceHistory) {
            return res.status(404).json({
                message: 'diceHistory not found'
            })
        }
        return res.status(200).json({
            message: 'delete diceHistory successfully',
            data: diceHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete diceHistory',
            error: error.message
        })
    }
}



module.exports = {
    createDiceHistory, getAllDiceHistories, getDiceHistoryById, updateDiceHistory, deleteDiceHistory
}

