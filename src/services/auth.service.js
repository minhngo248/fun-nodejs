const User = require('../models/user.model.js');
const {verifyPassword} = require('../utils/hash');
const {generateAuthToken, verifyToken} = require('../utils/jwt');
const {BadRequestError, UnauthorizedError} = require("../constants/error.constant");

exports.login = async (email, password) => {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Email is not registered'));
        });
    }
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return new Promise((resolve, reject) => {
            reject(new BadRequestError('Password is incorrect'));
        });
    }

    // generate token
    const token = generateAuthToken(user);
    return new Promise((resolve, reject) => {
        resolve(token);
    });
}

exports.verifyToken = (token) => {
    return verifyToken(token);
}