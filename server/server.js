const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const runRouter = require('./routes/run.router');
const weatherRouter = require('./routes/weather.router');
const statsRouter = require('./routes/stats.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
// user authentication
app.use('/api/user', userRouter);
// get run data
app.use('/api/runs', runRouter);
// get weekly runs
app.use('/api/runs/weekly', runRouter);
// get weekly runs
// app.use('/api/runs/last-week', runRouter);
// get monthly runs
app.use('/api/runs/monthly', runRouter)
// get weather data
app.use('/api/weather', weatherRouter)
app.use('/api/weather/description', weatherRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
