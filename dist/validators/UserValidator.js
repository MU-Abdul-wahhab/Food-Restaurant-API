"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)('name', 'Name is required').isString(),
            (0, express_validator_1.body)('phone', 'Phone Number is required').isString(),
            (0, express_validator_1.body)('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        return Promise.reject("User Already Exist");
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            }),
            (0, express_validator_1.body)('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 25 })
                .withMessage("Password must be between 8-20 Characters"),
            (0, express_validator_1.body)('type', 'User role is required').isString(),
            (0, express_validator_1.body)('status', 'User status is required').isString(),
        ];
    }
    static verifyUserEmailToken() {
        return [
            (0, express_validator_1.body)('verification_token', 'Email verification token is required').isNumeric(),
        ];
    }
    static login() {
        return [
            (0, express_validator_1.query)('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        return Promise.reject("No user Registered with such email");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            }),
            (0, express_validator_1.query)('password', 'Password is required').isAlphanumeric()
        ];
    }
    static checkPasswordEmail() {
        return [
            (0, express_validator_1.query)('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        return Promise.reject("No user Registered with such email");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            })
        ];
    }
    static verifyResetPasswordToken() {
        return [
            (0, express_validator_1.query)('email', 'Email is required').isEmail(),
            (0, express_validator_1.query)('reset_password_token', 'Reset Password Token is required').isNumeric()
                .custom((reset_password_token, { req }) => {
                return User_1.default.findOne({
                    email: req.query.email,
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        return Promise.reject("Reset Password Token doesn\'t Exist Please Regenerate new token");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            })
        ];
    }
    static resetPassword() {
        return [
            (0, express_validator_1.body)('email', 'Email is required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        return Promise.reject("No use registered with such email");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            }),
            (0, express_validator_1.body)('new_password', 'New Password Token is required').isAlphanumeric(),
            (0, express_validator_1.body)('reset_password_token', 'Reset Password Token is required').isNumeric()
                .custom((reset_password_token, { req }) => {
                if (req.user.reset_password_token == reset_password_token) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw ('Reset Password token is invalid please try again');
                }
            }),
        ];
    }
    static verifyPhoneNumber() {
        return [
            (0, express_validator_1.body)('phone', 'Phone NUmber is required').isString(),
        ];
    }
    static verifyUserProfile() {
        return [
            (0, express_validator_1.body)('phone', 'Phone NUmber is required').isString(),
            (0, express_validator_1.body)('email', 'Email is required').isEmail()
                .custom((email, { req }) => {
                if (req.user.email == email) {
                    throw (new Error("Please Provide New Email to Update The Your Profile"));
                }
                ;
                return User_1.default.findOne({
                    email: email,
                }).then(user => {
                    if (user) {
                        return Promise.reject("A user with Entered Email Already Exist Please Provide different Email");
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            }),
            (0, express_validator_1.body)('password', 'Password is required').isAlphanumeric(),
        ];
    }
}
exports.UserValidators = UserValidators;
