const voucherHistoryModel = require('../models/voucherHistoryModel');
const mongoose = require('mongoose');

// get all voucherHistories
const getAllVoucherHistories = async (req, res) => {
    try {
        let userQuery = req.query.user
        let condition = {
        }
        if (userQuery) {
            condition.user =userQuery
        }
        let voucherHistories = await voucherHistoryModel.find(condition);
        return res.status(200).json({
            message: 'get all voucherHistories successfully',
            data: voucherHistories
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all voucherHistories',
            error: error.message
        })
    }
}

// get voucherHistory by id
const getVoucherHistoryById = async (req, res) => {
    try {
        // collect data from client
        let voucherHistoryId = req.params.voucherHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
            return res.status(400).json({
                message: 'voucherHistoryId is invalid'
            })
        }
        // find voucherHistory by id
        let voucherHistory = await voucherHistoryModel.findById(voucherHistoryId);
        if (!voucherHistory) {
            return res.status(404).json({
                message: 'voucherHistory not found'
            })
        }
        return res.status(200).json({
            message: 'get voucherHistory by id successfully',
            data: voucherHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get voucherHistory by id',
            error: error.message
        })
    }
}




// create a voucherHistory
const createVoucherHistory = async (req, res) => {
    // Cách 1: sử dụng async await
    // take param userId
    // const userId = req.params.userId;
    // B1: collect data from client
    const {
        voucher, user
    } = req.body
    // B2:validate 
    if (!voucher) {
        return res.status(400).json({
            message: 'voucher is required'
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
    let newVoucherHistory = new voucherHistoryModel({
        _id: new mongoose.Types.ObjectId(),
        voucher,
        user
    })
    try {
        await voucherHistoryModel.create(newVoucherHistory);
        return res.status(200).json({
            message: 'create voucherHistory successfully',
            data: newVoucherHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create voucherHistory',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // voucherHistoryModel.create(newVoucherHistory)
    //     .then(data => res.status(200).json({ message: 'create voucherHistory successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create voucherHistory', error: error.message }))


}

// update a voucherHistory
const updateVoucherHistory = async (req, res) => {
    try {
        // collect data from client
        let voucherHistoryId = req.params.voucherHistoryId;
        const {
            voucher, user
        } = req.body
        // B2:validate 
        if (!voucher) {
            return res.status(400).json({
                message: 'voucher is required'
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

        if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
            return res.status(400).json({
                message: 'voucherHistoryId is invalid'
            })
        }

        let newVoucherHistoryData = new voucherHistoryModel({
            user,
            voucher,
            voucher: Math.floor(Math.random() * 6) + 1
        });
        // find and update voucherHistory by id
        let voucherHistory = await voucherHistoryModel.findByIdAndUpdate(voucherHistoryId, newVoucherHistoryData);
        if (!voucherHistory) {
            return res.status(404).json({
                message: 'voucherHistory not found'
            })
        }
        return res.status(200).json({
            message: 'update voucherHistory successfully',
            data: voucherHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update voucherHistory',
            error: error.message
        })
    }
}

// delete a voucherHistory
const deleteVoucherHistory = async (req, res) => {
    try {
        // collect data from client
        let voucherHistoryId = req.params.voucherHistoryId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
            return res.status(400).json({
                message: 'voucherHistoryId is invalid'
            })
        }
        // find and delete voucherHistory by id
        let voucherHistory = await voucherHistoryModel.findByIdAndDelete(voucherHistoryId);
        if (!voucherHistory) {
            return res.status(404).json({
                message: 'voucherHistory not found'
            })
        }
        return res.status(200).json({
            message: 'delete voucherHistory successfully',
            data: voucherHistory
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete voucherHistory',
            error: error.message
        })
    }
}



module.exports = {
    createVoucherHistory, getAllVoucherHistories, getVoucherHistoryById, updateVoucherHistory, deleteVoucherHistory
}

