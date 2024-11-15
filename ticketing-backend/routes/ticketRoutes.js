const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

// Get All Tickets
router.get('/', async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
});

// Add Tickets
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    const ticket = new Ticket({ name, price });
    await ticket.save();
    req.io.emit('ticketUpdate', { message: 'New ticket added' });
    res.status(201).json(ticket);
});

// Purchase Ticket
router.post('/purchase/:id', async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket || ticket.status !== 'available') {
        return res.status(400).json({ error: 'Ticket not available' });
    }

    ticket.status = 'sold';
    await ticket.save();
    req.io.emit('ticketUpdate', { message: 'Ticket purchased', ticket });
    res.json(ticket);
});

module.exports = router;
