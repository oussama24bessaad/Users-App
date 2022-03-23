const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
require('dotenv').config()
app.use(express.json())


const connectDB = require('./helpers/connectDB');
connectDB();

const User = require('./models/userModel')




app.use('/api/users',require('./routes/userRoutes'))

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port ${port}`);
});
