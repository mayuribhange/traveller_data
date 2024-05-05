"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../handler/login/login");
const express = require('express');
const ROUTER = express.Router();
ROUTER.post('/login', login_1.login);
exports.default = ROUTER;
