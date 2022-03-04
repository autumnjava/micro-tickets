const express = require('express');

const router = express.Router();

//@ts-ignore
router.get('/api/users/signup', (req, res) => {
    res.send('signed up!');
});

export {router as signupRouter };