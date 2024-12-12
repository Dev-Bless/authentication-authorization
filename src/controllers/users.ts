import {Request, Response} from "express";
import User from "../models/userSchema";
import {IUsers} from "../interfaces/userInterface";
import {hashPassword, verifyToken} from "../utils/token";
import {authorizeRole} from "../middleware/auth";


export async function getUsers(req:Request, res:Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
             res.status(401).send({ status: 401, message: 'Unauthorized' });
            return
        }
        const token = authHeader.split(' ')[1];
        const decodedToken: any = verifyToken(token);
        const loggedInUserEmail = decodedToken?.email;
        const loggedInUserRole = decodedToken?.role;

        if (!loggedInUserEmail || !loggedInUserRole) {
            res.status(401).send({ status: 401, message: 'Invalid token' });
            return;
        }

        const users = await User.find();

        // Filter users based on role
        let filteredUsers;
        if (loggedInUserRole === 'admin') {
            filteredUsers = users.filter(user => user.email !== loggedInUserEmail);
        } else {
            filteredUsers = users.filter(user =>
                user.email !== loggedInUserEmail && user.role !== 'admin'
            );
        }
         res.status(200).send({
            status: 200,
            data: filteredUsers,
            message: 'Users found successfully',
        });
    } catch (err: any) {
         res.status(400).send({
            status: 400,
            data: err.message,
            message: 'Users not found',
        });
    }

}



export async function addUser(req:Request<{},{},IUsers>, res:Response){
        const { name, email, phone, password ,role} = req.body;

        const user = new User();
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.password = await hashPassword(password);
        user.role = role;

        user.save()
        .then((data) => {
             res.status(200).send({status: 200, data: data, message: 'User added successfully'});
            return
        })
        .catch((err) => {
             res.status(400).send({status: 400, data: err.message, message: 'User not added'});
            return
        });
    
}



export function getUsersById(req:Request, res:Response) {
         const userId = parseInt(req.params.id);
         User.findOneBy({ id: userId})
        .then((data) =>  res.status(200).send({status: 200, data: data, message: 'User found successfully'}))
        .catch((err) =>   res.status(404).send({status: 404, data: err.message, message: 'User not found'}));          
     
}


export  function modifyUser(req:Request, res:Response) {
    const userId = parseInt(req.params.id);
    const updatedData = req.body;

     User.update({ id: userId }, updatedData)
        .then(() =>  res.status(200).send({status: 200, data: updatedData, message: 'User  successfully modified'}))
        .catch((err) =>   res.status(404).send({status: 404, data: err.message, message: 'User not found'}));               
    
    
}


export async function deleteUser(req:Request, res:Response) {      
    const userId = parseInt(req.params.id);
    const user = await User.findOneBy({ id: userId });

    if (user?.role === 'admin') {
        res.status(401).send({ status: 401, message: 'Unauthorized operation' });
        return
    }

     User.delete({ id: userId })
        .then(() =>  res.status(200).send({status: 200, message: 'User deleted successfully'}))
        .catch((err) =>   res.status(404).send({status: 404, data: err.message, message: 'User not found'}));
}

export async function changeUserRole(req: Request, res: Response) {
    try {
        const { userId, newRole } = req.body;
        if (!userId || !newRole) {
             res.status(400).json({ message: 'Bad Request: userId and newRole are required' });
            return
        }

        const user = await User.findOneBy(userId);
        if (!user) {
             res.status(404).json({ message: 'User not found' });
            return
        }

        user.role = newRole;
        await user.save();

         res.status(200).json({
            message: 'User role updated successfully',
            data: { userId: user.id, newRole: user.role },
        });
    } catch (error) {
        console.error('Error changing user role:', error);
         res.status(500).json({ message: 'Internal Server Error' });
    }
}


