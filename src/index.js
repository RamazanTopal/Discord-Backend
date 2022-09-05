const expresss = require('express');
const http = require('http');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const { registerSocketServer } = require('./socketServer');
const routes = require('./routes/index');
const mongoDB = require('./mongoDB/index');
const errorHandler = require('./errors/errorHandler');

const app = expresss();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(expresss.json());
app.use('/api/v1', routes);
app.use(errorHandler);
// connect MongoDB
mongoDB();

const server = http.createServer(app);
registerSocketServer(server);
server.listen(process.env.API_PORT || 8000, () => {
  console.info(`Server is running on the ${process.env.API_PORT || 8000}`);
});
