const express = require('express');
const router = express.Router();
const feedbackRoute = require('./feedback');

module.export = () => {
    router.get('/', (req,res) => {
       return res.send('index page')
    })
    router.use('/feedback',feedbackRoute())

    return router;
}
