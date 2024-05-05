"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_services_1 = require("../handler/addServices/add_services");
const express = require('express');
const ROUTER = express.Router();
ROUTER.post('/services', add_services_1.addServices);
exports.default = ROUTER;
