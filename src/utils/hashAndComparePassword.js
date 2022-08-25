const bcrypt = require('bcryptjs');

exports.comparePassword = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(error);
  }
};

exports.hashPassword = async (password) => {
  try {
    // Hash password
    return await bcrypt.hash(password, 12);
  } catch (error) {
    throw new Error(error);
  }
};
