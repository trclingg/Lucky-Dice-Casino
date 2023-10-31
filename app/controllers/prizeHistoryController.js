const prizeHistoryModel = require('../models/prizeHistoryModel');
const mongoose = require('mongoose');

// get all prizeHistories
const getAllPrizeHistories = async (req, res) => {
    try {
        let userQuery = req.query.user
        let condition = {
            user: ""
        }
        if (userQuery) {
            condition.user =userQuery
        }
        let prizeHistories = await prizeHistoryModel.find(condition);
        return res.status(200).json({
            message: 'get all prizeHistories successfully',
            data: prizeHistories
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all prizeHistories',
            error: error.message
        })
    }
}

// get prizeHistory by id
const getPrizeHistoryById = async (req, res) => {
    try {
        // collect data from client
        let prizeHistoryId = req.params.prizeHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
            return res.status(400).json({
                message: 'prizeHistoryId is invalid'
            })
        }
        // find prizeHistory by id
        let prizeHistory = await prizeHistoryModel.findById(prizeHistoryId);
        if (!prizeHistory) {
            return res.status(404).json({
                message: 'prizeHistory not found'
            })
        }
        return res.status(200).json({
            message: 'get prizeHistory by id successfully',
            data: prizeHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get prizeHistory by id',
            error: error.message
        })
    }
}




// create a prizeHistory
const createPrizeHistory = async (req, res) => {
    // Cách 1: sử dụng async await
    // take param userId
    // const userId = req.params.userId;
    // B1: collect data from client
    const {
        prize, user
    } = req.body
    // B2:validate 
    if (!prize) {
        return res.status(400).json({
            message: 'prize is required'
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

    // B3: 
    let newPrizeHistory = new prizeHistoryModel({
        _id: new mongoose.Types.ObjectId(),
        prize,
        user
    })
    try {
        await prizeHistoryModel.create(newPrizeHistory);
        return res.status(200).json({
            message: 'create prizeHistory successfully',
            data: newPrizeHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create prizeHistory',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // prizeHistoryModel.create(newPrizeHistory)
    //     .then(data => res.status(200).json({ message: 'create prizeHistory successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create prizeHistory', error: error.message }))


}

// update a prizeHistory
const updatePrizeHistory = async (req, res) => {
    try {
        // collect data from client
        let prizeHistoryId = req.params.prizeHistoryId;
        const {
            prize, user
        } = req.body
        // B2:validate 
        if (!prize) {
            return res.status(400).json({
                message: 'prize is required'
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

        if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
            return res.status(400).json({
                message: 'prizeHistoryId is invalid'
            })
        }

        let newPrizeHistoryData = new prizeHistoryModel({
            user,
            prize,
            prize: Math.floor(Math.random() * 6) + 1
        });
        // find and update prizeHistory by id
        let prizeHistory = await prizeHistoryModel.findByIdAndUpdate(prizeHistoryId, newPrizeHistoryData);
        if (!prizeHistory) {
            return res.status(404).json({
                message: 'prizeHistory not found'
            })
        }
        return res.status(200).json({
            message: 'update prizeHistory successfully',
            data: prizeHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update prizeHistory',
            error: error.message
        })
    }
}

// delete a prizeHistory
const deletePrizeHistory = async (req, res) => {
    try {
        // collect data from client
        let prizeHistoryId = req.params.prizeHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
            return res.status(400).json({
                message: 'prizeHistoryId is invalid'
            })
        }
        // find and delete prizeHistory by id
        let prizeHistory = await prizeHistoryModel.findByIdAndDelete(prizeHistoryId);
        if (!prizeHistory) {
            return res.status(404).json({
                message: 'prizeHistory not found'
            })
        }
        return res.status(200).json({
            message: 'delete prizeHistory successfully',
            data: prizeHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete prizeHistory',
            error: error.message
        })
    }
}



module.exports = {
    createPrizeHistory, getAllPrizeHistories, getPrizeHistoryById, updatePrizeHistory, deletePrizeHistory
}

