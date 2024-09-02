"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const RestaurantController_1 = require("../controllers/RestaurantController");
const RestaurantValidators_1 = require("../validators/RestaurantValidators");
const Utils_1 = require("../utils/Utils");
class CityRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/restaurants', GlobalMiddleware_1.GlobalMiddleware.auth, RestaurantController_1.RestaurantController.getCities);
        // this.router.get('/status', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerValidators.getBannerByStatus(), GlobalMiddleware.checkError , BannerController.getBannersByStatus);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleware_1.GlobalMiddleware.auth, GlobalMiddleware_1.GlobalMiddleware.adminRole, new Utils_1.Utils().multer.single('cover'), RestaurantValidators_1.RestaurantValidators.addRestaurant(), GlobalMiddleware_1.GlobalMiddleware.checkError, RestaurantController_1.RestaurantController.addRestaurants);
    }
    patchRoutes() {
    }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new CityRouter().router;
