"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class RestaurantValidators {
    static addRestaurant() {
        return [
            (0, express_validator_1.body)('name', 'Owner Name is required').isString(),
            (0, express_validator_1.body)('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        return Promise.reject("Restaurant Already Exist");
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    return Promise.reject(e);
                });
            }),
            (0, express_validator_1.body)('phone', 'Phone Number is required').isString(),
            (0, express_validator_1.body)('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 25 })
                .withMessage("Password must be between 8-20 Characters"),
            (0, express_validator_1.body)('cover', 'cover Image is required')
                .custom((cover, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw ('Cover File Not Uploaded');
                }
            }),
            (0, express_validator_1.body)('res_name', 'Restaurant Name is required').isString(),
            (0, express_validator_1.body)('short_name', 'Restaurant Short Name is required').isString(),
            (0, express_validator_1.body)('open_time', 'Open Time is required').isString(),
            (0, express_validator_1.body)('close_time', 'Close Time is required').isString(),
            (0, express_validator_1.body)('price', 'Price is required').isString(),
            (0, express_validator_1.body)('delivery_time', 'Delivery Time is required').isString(),
            (0, express_validator_1.body)('status', 'Status is required').isString(),
            (0, express_validator_1.body)('address', 'Address is required').isString(),
            (0, express_validator_1.body)('location', 'Location is required').isString(),
            (0, express_validator_1.body)('cuisines', 'Cuisines is required').isString(),
            (0, express_validator_1.body)('city_id', 'City is required').isString(),
        ];
    }
}
exports.RestaurantValidators = RestaurantValidators;
