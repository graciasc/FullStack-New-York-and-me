const express = require('express');
const app = express();

app.listen(3000)

module.export = app;

app.use('/', (req,res) => {
    res.send('Hello World')
})