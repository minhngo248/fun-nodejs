/* User CRUD Service from MongoDB */
const User = require('../models/user.model.js');
const {NotFoundError, BadRequestError} = require("../constants/error.constant");
const {hashPassword} = require('../utils/hash');

// Get all users paginated
exports.getAllUsers = (page, size) => {
    // get name and email only
    const users = User.find({}, 'name email')
        .skip(page * size)
        .limit(size);
    return users;
}

// Get user by id
exports.getUserById = async (userId) => {
    // get name and email only
    const user = await User.findById(userId, 'name email').exec();
    if (!user) {
        throw new NotFoundError('User not found');
    }
    return user;
}

// Create a new user
exports.createUser = async (name, email, password) => {
    if (!name || !email || !password) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Missing required fields: name, email, password.'));
        });
    }

    // if user already exists, throw error
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Email already exists'));
        });
    }

    const hashedPassword = hashPassword(password);
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: 'USER'
    });
    // return _id of new user
    newUser.save().then(r => console.log("User created successfully id: " + r._id));
    return new Promise((resolve, reject) => {
        resolve(newUser._id);
    });
}
