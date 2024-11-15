const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: String,
    price: Number,
    status: { type: String, enum: ['available', 'sold'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
