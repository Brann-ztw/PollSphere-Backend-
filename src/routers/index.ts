import express, { Application} from 'express';
import { routerAuth } from './authRouter';
import { routerPost } from './postRouter';

export const app: Application = express();
app.use(express.json());

app.use('/auth', routerAuth);
app.use('/post', routerPost);