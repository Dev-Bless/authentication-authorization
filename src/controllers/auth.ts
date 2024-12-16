import {Request, Response} from "express";
import {User} from "../models/userSchema";
import {generateToken, verifyPassword} from "../utils/token";
import {checkPasswordValidation} from "../utils/passwordverification";
import bcrypt from "bcrypt";


export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).send({message: 'Email or password is required'});
            return
        }
        const user = await User.findOneBy({ email });
        if (!user) {
             res.status(404).json({ message: "User not found" });
            return
        }

        const isPasswordValid = await verifyPassword(password, user?.password);
        if (!isPasswordValid) {
             res.status(401).json({ message: "Invalid password" });
             return;
        }

        const token = generateToken(user);
         res.status(200).json({ token });
    }
    catch (err: any) {
         res.status(500).json({ message: "An error occurred" });
    }

}




export  async function register (req:Request, res:Response) {
    const { name, email, phone, password } = req.body;
    try {
        const existingUser = await User.findOneBy({ email });

        if (!name || !email || !phone || !password ) {
            res.status(400).json({ message: "all fields must be filled" });
            return
        }


        if (existingUser) {
            res.status(409).json({ message: "Email is already registered and in use by another" });
            return
        }


        if (!checkPasswordValidation(password)) {
            res.status(400).json({
                message: "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character",
            });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User();
        user.name = name;
        user.email = email;
        user.phone = phone;

        user.password = hashedPassword;
        await user.save();

        res.status(201).json({
            status: 201,
            message: "Account created successfully",
        });
    }
    catch (err: any) {
        res.status(400).send({
            status: 400,
            data: err.message,
            message: 'Internal Server Error',
        });
    }

}

