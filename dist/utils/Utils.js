"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const bcrypt = require("bcrypt");
const Multer = require("multer");
const storageOptions = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/restaurants');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = (5 * 60 * 1000);
        this.multer = Multer({ storage: storageOptions, fileFilter: fileFilter });
    }
    static generateVerificationToken(digit = 6) {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(data) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
                if (err) {
                    reject(err);
                }
                else if (!same) {
                    reject(new Error('Password doesnt match'));
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.Utils = Utils;
