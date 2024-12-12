"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const appRouter = (0, express_1.Router)();
appRouter.get('/', users_1.getUsers);
appRouter.post('/:id', users_1.getUsersById);
exports.default = appRouter;
