const express = require('express');
const path = require('path');
const app = express();



var port = 3000;

app.get('/', (req,res) => {
    res.send("Pass the correct route");
})

app.listen(port);
console.log("Server started on port 3000");