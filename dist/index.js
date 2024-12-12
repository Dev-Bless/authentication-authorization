"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
require("dotenv/config");
// require('dotenv').config();
const app = (0, express_1.default)();
app.use('/api/users', users_1.default);
const port = process.argv[2] || process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
