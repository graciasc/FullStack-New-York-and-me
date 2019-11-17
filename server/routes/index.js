const express = require('express');
const router = express.router();
const feedbackRoute = require('./feedback');

module.export = () => {
    router.get('/', (req,res) => {
       return res.send('index page')
    })
    router.use('/feedbackRoute',feedback())
    return router;
}
