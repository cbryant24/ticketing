import express from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@cbtickets24/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0')
  ],
  validateRequest,
  async (req: any, res: any) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
    })
    
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };