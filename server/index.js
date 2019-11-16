const express = require('express');
const app = express();
const path = require('path')
// const about = require('../public/About')

app.listen(3000, () => {
    console.log('Server Started....')
})

app.use('/static',express.static("public")); // serving static files
app.use('/server', (req,res) => {// sending server world ---
    res.send('Server World')
})
app.use('/about', express.static('about'))
module.export = app;
