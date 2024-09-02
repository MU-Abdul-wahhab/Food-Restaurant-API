import { getEnvVariables } from "../enviroments/enviroment";
import User from "../models/User";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import { Jwt } from "../utils/Jwt";

export class UserController {

  static async signup(req, res, next) {
    // console.log(Utils.generateVerificationToken());

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    // const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    const verification_token = Utils.generateVerificationToken();

    try {
      const hash = await Utils.encryptPassword(req.body.password);

      const data = {
        email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        phone,
        password: hash,
        name,
        type,
        status,
      };

      let user = await new User(data).save();
      const payload = {
        // aud: user._id,
        email: user.email,
        type : user.type
      };
      const access_token = Jwt.jwtSign(payload , user._id);
      const refresh_token = Jwt.jswtSignRefreshToken(payload , user._id);
      res.json({
        token: access_token,
        refreshToken : refresh_token,
        user: user,
      });
      await NodeMailer.sendMail({
        to: [user.email],
        subject: "Verify Email",
        html: `<h1>Your OTP is ${verification_token}</h1>`,
      });
    } catch (e) {
      next(e);
    }
  }

  static async verifyUserEmailToken(req, res, next) {
    const verification_token = req.body.verification_token;
    const email = req.user.email;

    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error("Email Verification Token Is Expired");
      }
    } catch (e) {
      next(e);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    // res.send(req.decoded);
    const email = req.user.email;
    const verification_token = Utils.generateVerificationToken();

    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          updated_at: new Date(),
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        res.json({ success: true });
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Resend Email Verification",
          html: `<h1>Your OTP is ${verification_token}</h1>`,
        });
      } else {
        throw new Error("User dosnt exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    const user = req.user;
    const password = req.query.password;

    const data = {
      password,
      encrypt_password: user.password,
    };

    try {
      await Utils.comparePassword(data);
      const payload = {
        // aud: user._id,
        email: user.email,
        type : user.type
      };
      const access_token = Jwt.jwtSign(payload , user._id);
      const refresh_token = Jwt.jswtSignRefreshToken(payload , user._id);
      res.json({
        token: access_token,
        refreshToken : refresh_token,
        user: user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async sendPasswordOtp(req, res, next) {
    const email = req.query.email;
    const reset_password_token = Utils.generateVerificationToken();

    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          updated_at: new Date(),
          reset_password_token: reset_password_token,
          reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );
      if (user) {
        res.json({ success: true });
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Resend password Verification OTP",
          html: `<h1>Your OTP is ${reset_password_token}</h1>`,
        });
      } else {
        throw new Error("User dosnt exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async verifyResetPasswordToken(req, res, next) {
    res.json({
      success: true,
    });
  }

  static async resetPassword(req, res, next) {
    const user = req.user;
    const new_password = req.body.new_password;


    try {
      const encryptedPassword = await Utils.encryptPassword(new_password);
      console.log(encryptedPassword);
      const Updateduser = await User.findByIdAndUpdate(
        user._id,
        {
          updated_at: new Date(),
          password: encryptedPassword,
        },
        {
          new: true,
        }
      );
      if (Updateduser) {
        res.json(Updateduser);
      } else {
        throw new Error("User dosnt exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async Profile(req, res, next) {
    const user = req.user;

    try {
      const profile = await User.findById(user.aud);
      if (profile) {
        res.json(profile);
      } else {
        throw new Error("User dosnt exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async updatePhoneNumber(req , res , next){
    const user = req.user;
    const phone = req.body.phone;
    try{

     const userData = await User.findByIdAndUpdate(
      user.aud,
      {
        phone : phone,
        updated_at : new Date()
      },
      {
        new : true
      }
    );

    res.send(userData);

    }catch(e){
      next(e);
    }
  }

  static async updateUserProfile(req , res , next){
    const user = req.user;
    const phone = req.body.phone;
    const new_email = req.body.email;
    const plain_password = req.body.password;
    const verification_token = Utils.generateVerificationToken();
    try{

     const userData = await User.findByIdAndUpdate(user.aud);
     if(!userData) throw(new Error('User does not exist'));
      await Utils.comparePassword({
        password: plain_password,
        encrypt_password: userData.password
      });

      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        {
          phone : phone,
          email : new_email,
          email_verified : false,
          verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
          updated_at : new Date()
        },
        {
          new : true
        }
      );
      const payload = {
        // aud: user.aud,
        email: updatedUser.email,
        type : updatedUser.type
      };
      const access_token = Jwt.jwtSign(payload , user.aud);
      const refresh_token = Jwt.jswtSignRefreshToken(payload , user.aud);
      res.json({
        token: access_token,
        refreshToken : refresh_token,
        user: updatedUser,
      });
      await NodeMailer.sendMail({
        to: [updatedUser.email],
        subject: "Verify Email",
        html: `<h1>Your OTP is ${verification_token}</h1>`,
      });
 
    }catch(e){
      next(e);
    }
  }

  static async getNewToken(req , res , next){
    const refresh_token = req.body.refresh_token;

    try{

      const decoded_data = await Jwt.jwtVerifyRefreshToken(refresh_token);
      if(decoded_data){
        const payload = {
          email : decoded_data.email,
          type : decoded_data.type
        }

        const access_token = await Jwt.jwtSign(payload , decoded_data.aud);
        const refresh_token = await Jwt.jswtSignRefreshToken(payload , decoded_data.aud);
        res.json({
          token: access_token,
          refreshToken : refresh_token
        })
      }else{
        req.errorStatus = 403;
        throw('Access Denied');
      }

    }catch(e){
      req.errorStatus = 403;
      next(e);
    }
  }
}
