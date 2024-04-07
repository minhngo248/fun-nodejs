var express = require('express');
var router = express.Router();
const authService = require('../services/auth.service');

/* POST login */
router.post('/', function(req, res, next) {
    authService.login(req.body.username, req.body.password)
        .then(token => res.json({ token: token }))
        .catch(err => res.status(err.status).json({ message: err.message }));
});

/* GET logout */
router.get('/logout', function(req, res, next) {
    res.status(200).json({ message: 'User logged out successfully' });
});

/* GET protected route */
router.get('/protected', function(req, res, next) {
    // Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify token
    authService.verifyToken(token)
        .then(decoded => res.json({ message: 'Token is valid', user: decoded }))
        .catch(err => res.status(401).json({ message: 'Token is invalid' }));
});

module.exports = router;