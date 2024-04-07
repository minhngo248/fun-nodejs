/* User CRUD Service from MongoDB */
const User = require('../models/user.model.js');
const {NotFoundError, BadRequestError} = require("../constants/error.constant");

// Get all users paginated
exports.getAllUsers = (page, size) => {
    // get name and email only
    const users = User.find({}, 'name email role')
        .skip(page * size)
        .limit(size);
    return users;
}

// Get user by id
exports.getUserById = async (userId) => {
    // get name and email only
    const user = await User.findById(userId, 'name email role').exec();
    if (!user) {
        throw new NotFoundError('User not found');
    }
    return user;
}

// Create a new user
exports.createUser = async (username, name, email, password) => {
    if (!username || !name || !email || !password) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Missing required fields: username, name, email, password.'));
        });
    }

    // if user already exists, throw error
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Email already exists'));
        });
    }
    const payload = {
        username: username,
        name: name,
        email: email, 
        role: "USER"
    };
    // using passport-local-mongoose
    // return _id of new user
    return new Promise((resolve, reject) => {
        User.register(payload, password, (err, user) => {
            if (err) {
                reject(new BadRequestError(err.message));
            }
            resolve(user._id);
        });
    });
}
