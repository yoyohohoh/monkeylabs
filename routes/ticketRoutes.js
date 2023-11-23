const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/api/tickets', ticketController.getAllTickets);
router.get('/api/tickets/:id', ticketController.getTicketById);

router.post('/api/tickets', ticketController.createTicket);

router.put('/api/tickets/:id', ticketController.updateTicket);

router.delete('/api/tickets', ticketController.deleteAllTickets);

module.exports = router;