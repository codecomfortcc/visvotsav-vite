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
//serve static files

app.use(express.static(join(__dirname, "..",'client','dist')));
// Enable CORS for development
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  credentials: true,
}));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// Routes
app.use('/api/queries',postQueryRoute)

app.listen(PORT, function(){
  console.log(`Server is running
    at http://localhost:${PORT}`)
}
)
