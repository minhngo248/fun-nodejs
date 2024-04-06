const bcrypt = require('bcryptjs');

const saltRounds = 10; // Number of salt rounds (cost factor)

// Hash password
exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

// Verify password
exports.verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}