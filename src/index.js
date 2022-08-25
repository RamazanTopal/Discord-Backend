const expresss = require('express');
require('dotenv').config();
const morgan = require('morgan');
const routes = require('./routes/index');
const mongoDB = require('./mongoDB/index');
const errorHandler = require('./errors/errorHandler');

const app = expresss();

// middleware
app.use(morgan('dev'));
app.use(expresss.json());
app.use('/api/v1', routes);
app.use(errorHandler);
// connect MongoDB
mongoDB();
app.listen(process.env.API_PORT || 8000, () => {
  console.info(`Server is running on the ${process.env.API_PORT || 8000}`);
});
