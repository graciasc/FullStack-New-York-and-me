const express = require('express');
const router = express.Router();

module.export = () => {
    router.get('/', (req,res) => {
        return res.send('FeedBack page')
    })
    router.post('/', (req, res) => {
        res.send('Feedback Sent')
    })
    return router;
}
