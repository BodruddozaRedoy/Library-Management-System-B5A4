import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors'
// import { notesRoutes } from './app/controllers/notes.controller';
// import { usersRoutes } from './app/controllers/user.controller';

const app: Application = express();

app.use(express.json())
// app.use(cors({
//     origin: ["http://localhost:5173","https://library-management-system-b5-a4.vercel.app"]
// }))

app.use(cors())


app.use("/api", bookRoutes)
app.use("/api", borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Learning Management App');
});


export default app;
