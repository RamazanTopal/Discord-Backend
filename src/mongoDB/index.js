const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.info('MongoDB is connect to database');
  } catch (error) {
    console.info('MongoDB is not connect to database');
    process.exit(1);
  }
};
