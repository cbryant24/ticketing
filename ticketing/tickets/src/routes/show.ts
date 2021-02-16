import express from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@cbtickets24/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: any, res: any) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };