const jwt = require('jsonwebtoken');

module.exports = (user) => jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, { expiresIn: '1w' });
