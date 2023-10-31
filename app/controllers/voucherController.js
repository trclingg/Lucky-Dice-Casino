const voucherModel = require('../models/voucherModel');
const mongoose = require('mongoose');

// get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        let vouchers = await voucherModel.find({});
        return res.status(200).json({
            message: 'get all vouchers successfully',
            data: vouchers
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all vouchers',
            error: error.message
        })
    }
}

// get voucher by id
const getVoucherById = async (req, res) => {
    try {
        // collect data from client
        let voucherId = req.params.voucherId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(voucherId)) {
            return res.status(400).json({
                message: 'voucherId is invalid'
            })
        }
        // find voucher by id
        let voucher = await voucherModel.findById(voucherId);
        if (!voucher) {
            return res.status(404).json({
                message: 'voucher not found'
            })
        }
        return res.status(200).json({
            message: 'get voucher by id successfully',
            data: voucher
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get voucher by id',
            error: error.message
        })
    }
}




// create a voucher
const createVoucher = async (req, res) => {
    // Cách 1: sử dụng async await
    try {
        // B1: collect data from client
        const {
            code,
            discount
        } = req.body
        // B2:validate 
        if (!code) {
            return res.status(400).json({
                message: 'code is required'
            })
        }
        if (!discount) {
            return res.status(400).json({
                message: 'discount is required'
            })
        }
        // B3: 
        let newVoucher = new voucherModel({
            _id: new mongoose.Types.ObjectId(),
            code,
            discount
        })

        await voucherModel.create(newVoucher);
        return res.status(200).json({
            message: 'create voucher successfully',
            data: newVoucher
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create vouchers',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // voucherModel.create(newVoucher)
    //     .then(data => res.status(200).json({ message: 'create voucher successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create voucher', error: error.message }))


}

// update a voucher
const updateVoucher = async (req, res) => {
    try {
        // collect data from client
        let voucherId = req.params.voucherId;
        const {
            code,
            discount
        } = req.body
        // B2:validate 
        if (!code) {
            return res.status(400).json({
                message: 'code is required'
            })
        }
        if (!discount) {
            return res.status(400).json({
                message: 'discount is required'
            })
        }
       
        if (!mongoose.Types.ObjectId.isValid(voucherId)) {
            return res.status(400).json({
                message: 'voucherId is invalid'
            })
        }
        // B3:
        let newVoucherData = new voucherModel({
            code,
            discount
        });
        // find and update voucher by id
        let voucher = await voucherModel.findByIdAndUpdate(voucherId, newVoucherData);
        if (!voucher) {
            return res.status(404).json({
                message: 'voucher not found'
            })
        }
        return res.status(200).json({
            message: 'update voucher successfully',
            data: voucher
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update voucher',
            error: error.message
        })
    }
}

// delete a voucher
const deleteVoucher = async (req, res) => {
    try {
        // collect data from client
        let voucherId = req.params.voucherId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(voucherId)) {
            return res.status(400).json({
                message: 'voucherId is invalid'
            })
        }
        // find and delete voucher by id
        let voucher = await voucherModel.findByIdAndDelete(voucherId);
        if (!voucher) {
            return res.status(404).json({
                message: 'voucher not found'
            })
        }
        return res.status(200).json({
            message: 'delete voucher successfully',
            data: voucher
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete voucher',
            error: error.message
        })
    }
}



module.exports = {
    createVoucher, getAllVouchers, getVoucherById, updateVoucher, deleteVoucher
}

