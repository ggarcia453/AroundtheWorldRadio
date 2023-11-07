/**
 * 1. https://www.mongodb.com/languages/mern-stack-tutorial
 * 2. https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const radiosRouter = require('./routes/radios');

app.use('/radios', radiosRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});