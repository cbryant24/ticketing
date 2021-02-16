import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@cbtickets24/common';
import { Ticket } from '../models/ticket';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      params?: string;
      body?: any;
    }
  }
}

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, 
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and greated than 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price
  });
  await ticket.save();
  
  res.send(ticket);
});

export { router as updateTicketRouter }