const express = require('express');

const router = express.Router();

//@ts-ignore
router.post('/api/users/signout', (req, res) => {
    res.send('signed out!');

});

export {router as signoutRouter };