"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
let secret = process.env.SECRET_KEY;
console.log("===========", process.env.SECRET_KEY);
const generateToken = (payload) => {
    // return jwt.sign(payload, secret , { expiresIn: '9h' });  // Token expires in 9 hour
};
exports.generateToken = generateToken;
