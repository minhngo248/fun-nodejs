var express = require('express');
var router = express.Router();
const userService = require('../services/user.service');
const {preAuthMiddleware} = require("../middleware");

/* GET all users and return JSON array */
router.get('/', preAuthMiddleware, function(req, res, next) {
    // Pagination
    const page = req.query.page || 0;
    const size = req.query.size || 10;
    userService.getAllUsers(page, size)
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ message: err.message }));
});

/* GET user by id and return JSON object */
router.get('/:id', preAuthMiddleware, function(req, res, next) {
    userService.getUserById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(err.status).json({ message: err.message }));
});

/* POST create a new user */
router.post('/', function(req, res, next) {
    userService.createUser(req.body.name, req.body.email, req.body.password)
        .then(id => res.status(201).json({ id: id, message: 'User created successfully'}))
        .catch(err => res.status(err.status).json({ message: err.message }));
});

module.exports = router;
