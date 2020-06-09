const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const familyRouter = require('./routes/familyRoutes');
const eventRouter = require('./routes/eventRoutes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// CORS
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   res.header('Access-Control-Allow-Credentials', 'Content-Type');
//   next();
// });

app.use(morgan('dev'));

//ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/family', familyRouter);
app.use('/api/v1/event', eventRouter);

app.use(globalErrorHandler);

module.exports = app;
