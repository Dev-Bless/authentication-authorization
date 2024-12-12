import express, {Express} from 'express';
import {login, register} from "../controllers/auth";

const authRouterApp:Express = express()

authRouterApp.route('/login')
    .post(login)


authRouterApp.route('/register')
    .post(register)

export default authRouterApp;
