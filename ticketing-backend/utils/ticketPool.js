const Ticket = require('../models/Ticket');

// Simulate ticket producers
function startProducers(io) {
    setInterval(async () => {
        const ticket = new Ticket({ name: `Ticket-${Date.now()}`, price: Math.random() * 100 });
        await ticket.save();
        io.emit('ticketUpdate', { message: 'New ticket released', ticket });
    }, 5000); // Add a ticket every 5 seconds
}

// Simulate ticket consumers
function startConsumers(io) {
    setInterval(async () => {
        const ticket = await Ticket.findOneAndUpdate(
            { status: 'available' },
            { status: 'sold' },
            { new: true }
        );

        if (ticket) {
            io.emit('ticketUpdate', { message: 'Ticket purchased by a consumer', ticket });
        }
    }, 7000); // Simulate a purchase every 7 seconds
}

module.exports = { startProducers, startConsumers };
