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
exports.RestaurantController = void 0;
const Category_1 = require("../models/Category");
const Restaurant_1 = require("../models/Restaurant");
const Utils_1 = require("../utils/Utils");
class RestaurantController {
    static addRestaurants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = req.body;
            const path = req.file.path;
            const verification_token = Utils_1.Utils.generateVerificationToken();
            try {
                const hash = yield Utils_1.Utils.encryptPassword(req.body.password);
                const data = {
                    email: restaurant.email,
                    verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                    phone: restaurant.phone,
                    password: hash,
                    name: restaurant.name,
                    type: 'restaurant',
                    status: 'active',
                };
                const user = yield new Restaurant_1.default(data).save();
                res.send(user);
                const categoriesData = JSON.parse(restaurant.categories).map(x => {
                    return {
                        name: x, user_id: user._id
                    };
                });
                const categories = Category_1.default.insertMany(categoriesData);
                let restaurant_data = {
                    name: restaurant.res_name,
                    short_name: restaurant.short_name,
                    location: JSON.parse(restaurant.location),
                    address: restaurant.address,
                    openTime: restaurant.openTime,
                    closeTime: restaurant.closeTime,
                    status: restaurant.status,
                    cuisines: JSON.parse(restaurant.cuisines),
                    price: parseInt(restaurant.prince),
                    delivery_time: parseInt(restaurant.delivery_time),
                    city_id: restaurant.city_id,
                    user_id: user._id,
                    cover: path
                };
                if (restaurant.description) {
                    restaurant_data = Object.assign(Object.assign({}, restaurant_data), { description: restaurant.description });
                }
                const restaurantDoc = yield new Restaurant_1.default(restaurant_data).save();
                res.send(restaurantDoc);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield Restaurant_1.default.find({ status: 'active' });
                res.send(cities);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.RestaurantController = RestaurantController;
