"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleware = void 0;
const express_validator_1 = require("express-validator");
const Jwt_1 = require("../utils/Jwt");
class GlobalMiddleware {
    static checkError(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
        }
        else {
            next();
        }
    }
    static auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const header_auth = req.headers.authorization;
            const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
            try {
                if (!token) {
                    next(new Error("User Doesn't Exist"));
                    req.errorStatus = 401;
                }
                const decoded = yield Jwt_1.Jwt.jwtVerify(token);
                req.user = decoded;
                next();
            }
            catch (e) {
                req.errorStatus = 401;
                next(new Error("User Doesn't Exist"));
            }
        });
    }
    static adminRole(req, res, next) {
        const user = req.user;
        if (user.type !== 'admin') {
            req.errorStatus = 401;
            next(new Error('Your an Unauthorized user'));
        }
        next();
    }
}
exports.GlobalMiddleware = GlobalMiddleware;
