const bcrypt = require('bcryptjs');

module.exports = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(error);
  }
};
