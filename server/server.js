/**
 * 1. https://www.mongodb.com/languages/mern-stack-tutorial
 * 2. https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import radios from './api/radios.route.js';
import callsigns from './api/callsigns.route.js';
import RadiosDAO from './dao/radiosDAO.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.RADIOS_DB_URI;

mongoose.connect(uri, {
    maxPoolSize: 50,
    waitQueueTimeoutMS: 2500
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use("/api/v1/radios", radios);
app.use("/api/v1/callsigns", callsigns);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

await RadiosDAO.injectDB(connection);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;