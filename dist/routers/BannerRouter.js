"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleware_1 = require("../middlewares/GlobalMiddleware");
const BannerValidator_1 = require("../validators/BannerValidator");
const BannerController_1 = require("../controllers/BannerController");
const Utils_1 = require("../utils/Utils");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/banners', GlobalMiddleware_1.GlobalMiddleware.auth, GlobalMiddleware_1.GlobalMiddleware.adminRole, BannerController_1.BannerController.getBanners);
        this.router.get('/status', GlobalMiddleware_1.GlobalMiddleware.auth, GlobalMiddleware_1.GlobalMiddleware.adminRole, BannerValidator_1.BannerValidators.getBannerByStatus(), GlobalMiddleware_1.GlobalMiddleware.checkError, BannerController_1.BannerController.getBannersByStatus);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleware_1.GlobalMiddleware.auth, GlobalMiddleware_1.GlobalMiddleware.adminRole, new Utils_1.Utils().multer.single('banner'), BannerValidator_1.BannerValidators.addBanner(), GlobalMiddleware_1.GlobalMiddleware.checkError, BannerController_1.BannerController.addBanner);
    }
    patchRoutes() {
    }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new BannerRouter().router;