const express = require('express');

const router = express.Router();

//@ts-ignore
router.get('/api/users/currentuser', (req, res) => {
    res.send('current user!');

});

export {router as currentUserRouter };