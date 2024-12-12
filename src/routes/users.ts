import express from 'express';
import {addUser, changeUserRole, deleteUser, getUsers, getUsersById, modifyUser} from '../controllers/users';
import {authorizeRole} from "../middleware/auth";

const appRouter = express();

appRouter.route('/')
.get(getUsers)
.post(addUser)


appRouter.route('/:id',)
.get( getUsersById)
.put( modifyUser)
.delete( authorizeRole('admin'), deleteUser);

appRouter.route('/change-role')
    .patch(authorizeRole('admin') , changeUserRole)


export default  appRouter;
