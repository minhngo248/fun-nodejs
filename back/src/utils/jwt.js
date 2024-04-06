/* Generate a JWT token */
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret';

exports.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '1h' });
    return token;
}

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}