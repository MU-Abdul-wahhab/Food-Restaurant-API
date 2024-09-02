"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const CityController_1 = require("../controllers/CityController");
const CityValidators_1 = require("../validators/CityValidators");
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
        this.router.get('/cities', CityController_1.CityController.getCities);
        // this.router.get('/status', GlobalMiddleware.auth , GlobalMiddleware.adminRole, BannerValidators.getBannerByStatus(), GlobalMiddleware.checkError , BannerController.getBannersByStatus);
    }
    postRoutes() {
        this.router.post('/create', CityValidators_1.CityValidators.addCity(), GlobalMiddleware_1.GlobalMiddleware.checkError, CityController_1.CityController.addCities);
    }
    patchRoutes() {
    }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new CityRouter().router;
