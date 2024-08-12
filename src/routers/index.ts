import express, { Application} from 'express';
import { routerAuth } from './auth';

export const app: Application = express();
app.use(express.json());

app.use('/auth', routerAuth);