"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
    banner: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
exports.default = mongoose.model('banners', bannerSchema);
