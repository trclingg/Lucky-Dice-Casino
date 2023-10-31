const prizeModel = require('../models/prizeModel');
const mongoose = require('mongoose');

// get all prizes
const getAllPrizes = async (req, res) => {
    try {
        let prizes = await prizeModel.find({});
        return res.status(200).json({
            message: 'get all prizes successfully',
            data: prizes
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all prizes',
            error: error.message
        })
    }
}

// get prize by id
const getPrizeById = async (req, res) => {
    try {
        // collect data from client
        let prizeId = req.params.prizeId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(prizeId)) {
            return res.status(400).json({
                message: 'prizeId is invalid'
            })
        }
        // find prize by id
        let prize = await prizeModel.findById(prizeId);
        if (!prize) {
            return res.status(404).json({
                message: 'prize not found'
            })
        }
        return res.status(200).json({
            message: 'get prize by id successfully',
            data: prize
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get prize by id',
            error: error.message
        })
    }
}




// create a prize
const createPrize = async (req, res) => {
    // Cách 1: sử dụng async await
    try {
        // B1: collect data from client
        const {
            name
        } = req.body
        // B2:validate 
        if (!name) {
            return res.status(400).json({
                message: 'name is required'
            })
        }
       
        // B3: 
        let newPrize = new prizeModel({
            _id: new mongoose.Types.ObjectId(),
            name
        })

        await prizeModel.create(newPrize);
        return res.status(200).json({
            message: 'create prize successfully',
            data: newPrize
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create prizes',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // prizeModel.create(newPrize)
    //     .then(data => res.status(200).json({ message: 'create prize successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create prize', error: error.message }))


}

// update a prize
const updatePrize = async (req, res) => {
    try {
        // collect data from client
        let prizeId = req.params.prizeId;
        const {
            name
        } = req.body
        // B2:validate 
        if (!name) {
            return res.status(400).json({
                message: 'name is required'
            })
        }
       
        if (!mongoose.Types.ObjectId.isValid(prizeId)) {
            return res.status(400).json({
                message: 'prizeId is invalid'
            })
        }
        // B3:
        let newPrizeData = new prizeModel({
          name
        });
        // find and update prize by id
        let prize = await prizeModel.findByIdAndUpdate(prizeId, newPrizeData);
        if (!prize) {
            return res.status(404).json({
                message: 'prize not found'
            })
        }
        return res.status(200).json({
            message: 'update prize successfully',
            data: prize
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update prize',
            error: error.message
        })
    }
}

// delete a prize
const deletePrize = async (req, res) => {
    try {
        // collect data from client
        let prizeId = req.params.prizeId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(prizeId)) {
            return res.status(400).json({
                message: 'prizeId is invalid'
            })
        }
        // find and delete prize by id
        let prize = await prizeModel.findByIdAndDelete(prizeId);
        if (!prize) {
            return res.status(404).json({
                message: 'prize not found'
            })
        }
        return res.status(200).json({
            message: 'delete prize successfully',
            data: prize
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete prize',
            error: error.message
        })
    }
}



module.exports = {
    createPrize, getAllPrizes, getPrizeById, updatePrize, deletePrize
}

