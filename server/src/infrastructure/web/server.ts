import express from 'express';
import userRouter from './routes/userRouter'; // Ensure this path is correct
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors())
app.use(userRouter)

// app.use('/api', userRouter); // Ensure the route prefix matches your API structure
mongoose.connect(`mongodb+srv://blogItDb:${process.env.dbpass}@cluster0.aisuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export { app };
