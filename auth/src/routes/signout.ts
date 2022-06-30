import express, {Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({});

});

export {router as signoutRouter };