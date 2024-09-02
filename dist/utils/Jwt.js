"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const enviroment_1 = require("../enviroments/enviroment");
const jwt = require("jsonwebtoken");
class Jwt {
    static jwtSign(payload, expires_in = '180days') {
        return jwt.sign(payload, (0, enviroment_1.getEnvVariables)().jwt_secret_key, {
            expiresIn: expires_in,
            issuer: 'abdulwahhab200547@gmail.com'
        });
    }
    static jwtVerify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, (0, enviroment_1.getEnvVariables)().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else if (!decoded) {
                    reject(new Error('User is not authorized'));
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.Jwt = Jwt;
