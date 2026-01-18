import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/DB.js';
import Cloudinary from './routes/cloudinary.js'
import Product from './routes/product.js'
import Auth from './routes/auth.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

connectDB();

// Routes
app.get("/", (req, res) => {
    res.send({ message: "SERVER IS RUNNING." })
})

app.use('/cloudinary', Cloudinary)
app.use('/product', Product)
app.use('/auth', Auth)

export default app;