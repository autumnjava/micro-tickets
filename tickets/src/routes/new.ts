import express, { Request, Response } from 'express';
import { requireAuth } from '@gunit/common';
const router = express.Router();

router.post('/api/tickets', (req: Request, res: Response) => {
  console.log(req.cookies);
  
  return res.sendStatus(200);
});

export { router as createTicketRouter };
