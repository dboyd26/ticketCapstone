const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The ticket text is required']
    },

    description: {
        type: String,
        required: [true, 'The ticket text is required']
    }
})

const Ticket = mongoose.model('ticket', TicketSchema);


module.exports = Ticket;