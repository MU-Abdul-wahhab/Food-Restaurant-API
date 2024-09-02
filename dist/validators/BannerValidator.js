"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerValidators = void 0;
const express_validator_1 = require("express-validator");
class BannerValidators {
    static addBanner() {
        return [
            (0, express_validator_1.body)('banner', 'Banner Image is required')
                .custom((banner, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw ('File Not Uploaded');
                }
            }),
        ];
    }
    static getBannerByStatus() {
        return [
            (0, express_validator_1.query)('status', 'Status is required')
                .isBoolean()
        ];
    }
}
exports.BannerValidators = BannerValidators;
