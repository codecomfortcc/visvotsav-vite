import express from 'express';
import {fileURLToPath} from 'url';
import {dirname,join} from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import postQueryRoute from './routes/queries.routes.js';
// Load environment variables from.env file

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://visvotsav.vercel.app'],
  credentials: true,
}));
// Routes
app.use('/api/queries',postQueryRoute)
app.get('/',(req,res)=>{
  res.status(200).send('Welcome to visvotsav')
})
app.listen(PORT, function(){
  console.log(`Server is running
    at http://localhost:${PORT}`)
}
)
