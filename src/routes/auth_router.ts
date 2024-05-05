import { login } from "../handler/login/login";

const express = require('express');

const ROUTER = express.Router();

ROUTER.post('/login', login);

export default ROUTER;