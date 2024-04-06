// Middleware function to check if user is authenticated
const authService = require('./services/auth.service');

exports.preAuthMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    authService.verifyToken(token)
        .then(decoded => next())
        .catch(err => res.status(401).json({ message: 'Token is invalid' }));
}
