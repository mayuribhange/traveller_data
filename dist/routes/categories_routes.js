"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_categories_1 = require("../handler/addCategories/add_categories");
const express = require('express');
const ROUTER = express.Router();
ROUTER.post('/category', add_categories_1.addCategories);
exports.default = ROUTER;
