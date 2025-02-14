const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        min: 0 
    },
    type: {
        type: String,
        default: 'income'
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200 
    }
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
