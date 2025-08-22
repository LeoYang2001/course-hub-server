

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import canvasRoutes from './routes/canvasRoutes.js';
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/canvas', canvasRoutes);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
