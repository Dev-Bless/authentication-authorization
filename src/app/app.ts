import express ,{Request,Response} from 'express';
import appRouter from '../routes/users';
import authRouterApp from '../routes/auth';
import cors from 'cors';
import {authenticateJWT} from "../middleware/auth";


const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:58792',
        methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
        credentials: true
    }
))


app.use('/api/users',authenticateJWT, appRouter);
app.use('/api/auth', authRouterApp);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Igus Online Tools Upskilling Authentication Authorization App');
})


export default app;
