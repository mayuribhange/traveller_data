"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const utilis_1 = require("../../utilis/utilis");
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Joi validator
        console.log(request.body);
        const { email, password } = request === null || request === void 0 ? void 0 : request.body;
        if (email == process.env.EMAIL) {
            if (process.env.PASSWORD == password) {
                let token = yield (0, utilis_1.generateToken)({ email: process.env.EMAIL });
                console.log(token);
            }
            else {
                return response.status(422).json({ message: "Password mismatch" });
            }
        }
        else {
            return response.status(422).json({ message: "Invalid User" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.login = login;
