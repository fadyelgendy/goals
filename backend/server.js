const express = require('express');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connect = require("./config/database");
const PORT = process.env.PORT || 5000;

connect();

const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
