const express = require('express');
const app = express();
const path = require('path')

app.listen(3000, () => {
    console.log('Server Started....')
})

app.use('/',express.static("public")); // serving static files
app.use('/about.html',express.static("public")); // serving static files
app.use('/server', (req,res) => {// sending server world ---
    res.send('Server World')
})
module.export = app;
