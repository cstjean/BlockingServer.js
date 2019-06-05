var express = require('express');
var app = express();

// Test call 
app.get('/nolock', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ value:"12345" }));
})

// Call will lock for x seconds before returning content
app.get('/lock/:seconds', (req, res) => {
    var waitSeconds = req.params.seconds;
    console.log('Waiting %d seconds ...', waitSeconds);

    var waitTill = new Date(new Date().getTime() + waitSeconds * 1000);
    while(waitTill > new Date()){}    

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ value:"locked" }));
})

const PORT = 8082;
app.listen(PORT, () => {
   console.log("App listening on port ", PORT)
})
