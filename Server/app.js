// creation sever
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errormiddleware')
const connectDB = require('./config/db');
const port = process.env.PORT || 6000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use('/api', require('./routes/Routes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

app.use(errorHandler)
//listenig port
app.listen(port, () => console.log(`server is running ${port}`));


