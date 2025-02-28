import express, { Application} from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser'


const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


// importing routes
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';



app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
export default app;
