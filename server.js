//this version of the surf tracker is going to be done in node, express, mongo, and mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./server/config/db')

const PORT = process.env.PORT || 3001;

const surfSchema = new mongoose.Schema({
    user: String,
    location: String,
    height: Number,
    swellDirection: String,
    swellPeriod: Number,
    tide: Number,
    windSpeed: Number,
    rating: Number
});

app.listen(PORT, ()=>{
    console.log('Server running on PORT:', PORT);
});

