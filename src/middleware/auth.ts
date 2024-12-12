import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res.status(403).json({ message: "Unauthorized" });
        return
    }

    const token = authHeader.split(" ")[1];

    try {
        req.body.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch (error) {
         res.status(403).json({ message: "Invalid or no token" });
        return
    }

}



export function authorizeRole(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (!user || user.role !== requiredRole) {
             res.status(403).json({ message: 'Forbidden: only admins can delete' });
            return
        }

        next();
    };
}
