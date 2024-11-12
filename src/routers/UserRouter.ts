import { Router } from "express";
import { UserValidators } from "../validators/UserValidator";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";


class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/send/verification/email', GlobalMiddleware.auth, UserController.resendVerificationEmail);
    this.router.get('/login', UserValidators.login(), GlobalMiddleware.checkError, UserController.login);
    this.router.get('/send/reset/password/token', UserValidators.checkPasswordEmail(), GlobalMiddleware.checkError, UserController.sendPasswordOtp);
    this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleware.checkError, UserController.verifyResetPasswordToken);
    this.router.get('/profile',  GlobalMiddleware.auth, UserController.Profile);
  }

  postRoutes() {
    this.router.post('/signup', UserValidators.signup(), GlobalMiddleware.checkError, UserController.signup);
    this.router.post('/refresh_token', UserValidators.checkRefreshToken(), GlobalMiddleware.checkError, UserController.getNewToken);
    this.router.post('/logout', GlobalMiddleware.auth, UserValidators.checkRefreshToken(), GlobalMiddleware.checkError, UserController.logout);
  }

  patchRoutes() {
    this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleware.checkError, UserController.resetPassword);
    this.router.patch('/verify/email', GlobalMiddleware.auth, UserValidators.verifyUserEmailToken(), GlobalMiddleware.checkError, UserController.verifyUserEmailToken);
    this.router.patch('/update/phone', GlobalMiddleware.auth, UserValidators.verifyPhoneNumber(), GlobalMiddleware.checkError, UserController.updatePhoneNumber);
    this.router.patch('/update/profile', GlobalMiddleware.auth, UserValidators.verifyUserProfile(), GlobalMiddleware.checkError, UserController.updateUserProfile);
  }

  putRoutes() { }

  deleteRoutes() { }

}

export default new UserRouter().router;