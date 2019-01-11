//this version of the surf tracker is going to be done in node, express, mongo, and mongoose
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});

