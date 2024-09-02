"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserValidator_1 = require("../validators/UserValidator");
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleware_1.GlobalMiddleware.auth, UserController_1.UserController.resendVerificationEmail);
        this.router.get('/login', UserValidator_1.UserValidators.login(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
        this.router.get('/send/reset/password/token', UserValidator_1.UserValidators.checkPasswordEmail(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.sendPasswordOtp);
        this.router.get('/verify/resetPasswordToken', UserValidator_1.UserValidators.verifyResetPasswordToken(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyResetPasswordToken);
        this.router.get('/profile', GlobalMiddleware_1.GlobalMiddleware.auth, UserController_1.UserController.Profile);
    }
    postRoutes() {
        this.router.post('/signup', UserValidator_1.UserValidators.signup(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.signup);
    }
    patchRoutes() {
        this.router.patch('/reset/password', UserValidator_1.UserValidators.resetPassword(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.resetPassword);
        this.router.patch('/verify/email', GlobalMiddleware_1.GlobalMiddleware.auth, UserValidator_1.UserValidators.verifyUserEmailToken(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.verifyUserEmailToken);
        this.router.patch('/update/phone', GlobalMiddleware_1.GlobalMiddleware.auth, UserValidator_1.UserValidators.verifyPhoneNumber(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updatePhoneNumber);
        this.router.patch('/update/profile', GlobalMiddleware_1.GlobalMiddleware.auth, UserValidator_1.UserValidators.verifyUserProfile(), GlobalMiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.updateUserProfile);
    }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
