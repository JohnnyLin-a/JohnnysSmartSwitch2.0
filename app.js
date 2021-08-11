import createError from 'http-errors';
import express from 'express';
import path from 'path';

import indexRouter from './routes/index.js';
import apiV1 from './routes/api/v1/index.js';
import authenticatedMiddleware from './middlewares/authenticated.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authenticatedMiddleware);

// Define routes here
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/v1', apiV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    next(createError(404));
  } else {
    res.status(404);
    res.end();
  }

});

export default app;