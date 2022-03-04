import express, {Request, Response } from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send('current user!');

});

export {router as currentUserRouter };