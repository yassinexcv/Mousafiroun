const mongoose = require('mongoose');

// create a schema for the ticket

const ticketSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    trip_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);
