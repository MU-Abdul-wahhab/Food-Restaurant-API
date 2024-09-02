"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose_1 = require("mongoose");
const enviroment_1 = require("./enviroments/enviroment");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter_1 = require("./routers/UserRouter");
const BannerRouter_1 = require("./routers/BannerRouter");
const CityRouter_1 = require("./routers/CityRouter");
const RestaurantRouter_1 = require("./routers/RestaurantRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }
    connectMongoDB() {
        mongoose_1.default.connect((0, enviroment_1.getEnvVariables)().db_uri)
            .then(() => {
            console.log('Connected to MongoDB');
        }).catch(e => console.log(e));
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
    allowCors() {
        this.app.use(cors());
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/banner', BannerRouter_1.default);
        this.app.use('/api/city', CityRouter_1.default);
        this.app.use('/api/restaurant', RestaurantRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Not Found",
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong please try again later",
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
