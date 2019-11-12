const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server Started....')
})


app.use('/', (req,res) => {
    res.send('Hello World')
})
module.export = app;