const express = require('express');
const rateLimit = require('express-rate-limit');
const fileUploader = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const AppError = require('./util/AppError')
const app = express()
const path = require('path');

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

app.use(fileUploader({
    limits: { fileSize: 4 * 1024 * 1024 },
}));

// Limit request from the same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, // 1h
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    extended: false,
    limit: '15kb'
}));

// Routes
const userRouter = require('./routes/user')
const authRouter = require('./routes/authentication')
const profileRouter = require('./routes/profile')
const bookRouter = require('./routes/book')
const reviewRouter = require('./routes/review')

app.use('/api/v1/book', bookRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/review', reviewRouter)

// app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

module.exports = app;