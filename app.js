const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Api rate limiting
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many request from this ip, Please try again in an hour'
});

app.use('/api/v1/users', limiter);

// Routes
app.use('/api/v1/users', userRouter);

// Error Handling middleware
app.use(globalErrorHandler);

module.exports = app