import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}


export async function verifyPassword(password: string, hashedPassword: string | undefined): Promise<boolean> {
    return bcrypt.compare(password, <string>hashedPassword);
}


export function generateToken(user: User | null | void): string {
    return jwt.sign(
        { id: user!.id, email: user!.email, role: user!.role },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRATION || "1h"  },
    );
}


export function verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET!);
}


export function generateRefreshToken(user: User | null | void): string {
    return jwt.sign(
        { id: user!.id},
        process.env.RT_SECRET!,
        { expiresIn: process.env.RT_EXPIRATION || "7d"  },
    );
}


export function verifyRefreshToken(refreshToken: string): any {
    return jwt.verify(refreshToken, process.env.RT_SECRET!);
}
