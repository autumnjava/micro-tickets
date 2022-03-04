const express = require('express');

const router = express.Router();

//@ts-ignore
router.post('/api/users/signin', (req, res) => {
    res.send('signed in!');

});

export {router as signinRouter };