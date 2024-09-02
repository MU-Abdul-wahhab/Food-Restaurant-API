"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVariables = getEnvVariables;
const enviroment_dev_1 = require("./enviroment.dev");
const enviroment_prod_1 = require("./enviroment.prod");
function getEnvVariables() {
    if (process.env.NODE_ENV == 'production') {
        return enviroment_prod_1.ProdEnvironment;
    }
    return enviroment_dev_1.DevEnvironment;
}
