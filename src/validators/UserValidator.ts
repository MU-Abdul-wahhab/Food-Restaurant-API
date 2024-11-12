import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {

    static signup() {
        return [
            body('name', 'Name is required').isString(),
            body('phone', 'Phone Number is required').isString(),
            body('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then(user => {
                    if (user) {
                        return Promise.reject("User Already Exist");
                    } else {
                        return true;
                    }
                }).catch(e => {
                    return Promise.reject(e);
                })
            }),
            body('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 25 })
                .withMessage("Password must be between 8-20 Characters"),
            body('type', 'User role is required').isString(),
            body('status', 'User status is required').isString(),

        ]
    }

    static verifyUserEmailToken() {
        return [
            body('verification_token', 'Email verification token is required').isNumeric(),

        ];
    }

    static login() {
        return [

            query('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    } else {

                        return Promise.reject("No user Registered with such email");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                })
            }),
            query('password', 'Password is required').isAlphanumeric()

        ];
    }

    static checkPasswordEmail() {
        return [

            query('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then(user => {
                    if (user) {

                        return true;
                    } else {

                        return Promise.reject("No user Registered with such email");
                    }
                }).catch(e => {
                    return Promise.reject(e);
                })
            })
        ];
    }

    static verifyResetPasswordToken() {
        return [

            query('email', 'Email is required').isEmail(),
            query('reset_password_token', 'Reset Password Token is required').isNumeric()
                .custom((reset_password_token, { req }) => {
                    return User.findOne(
                        {
                            email: req.query.email,
                            reset_password_token: reset_password_token,
                            reset_password_token_time: { $gt: Date.now() }
                        }
                    ).then(user => {
                        if (user) {

                            return true;
                        } else {

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
            body('email', 'Email is required').isEmail()
                .custom((email, { req }) => {
                    return User.findOne(
                        {
                            email: email,
                        }
                    ).then(user => {
                        if (user) {
                            req.user = user;
                            return true;
                        } else {

                            return Promise.reject("No use registered with such email");
                        }
                    }).catch(e => {
                        return Promise.reject(e);
                    });
                }),
            body('new_password', 'New Password Token is required').isAlphanumeric(),
            body('reset_password_token', 'Reset Password Token is required').isNumeric()
                .custom((reset_password_token, { req }) => {
                    if (req.user.reset_password_token == reset_password_token) {
                        return true;
                    } else {
                        req.errorStatus = 422;
                        throw ('Reset Password token is invalid please try again');
                    }
                }),


        ];
    }

    static verifyPhoneNumber() {
        return [
            body('phone', 'Phone NUmber is required').isString(),
        ];
    }

    static verifyUserProfile() {
        return [
            body('phone', 'Phone NUmber is required').isString(),
            body('email', 'Email is required').isEmail()
                .custom((email, { req }) => {
                    if(req.user.email == email) {throw(new Error("Please Provide New Email to Update The Your Profile"))};
                    return User.findOne(
                        {
                            email: email,
                        }
                    ).then(user => {
                        if (user) {
                            return Promise.reject("A user with Entered Email Already Exist Please Provide different Email");
                        } else {
                            return true;
                        }
                    }).catch(e => {
                        return Promise.reject(e);
                    });
                }),
            body('password', 'Password is required').isAlphanumeric(),
        ];
    }

    static checkRefreshToken() {
        return [
          body('refresh_token', 'Refresh Token is required').isString()
          .custom((refresh_token, { req }) => {
            if (refresh_token) {
              return true;
            } else {
              req.errorStatus = 403;
              throw new Error('Access is Forbidden');
            }
          })
        ];
      }

}