import express from 'express';
import cors from 'cors';
import  bicycleRouter  from './bicycle/router';
const app = express();
app.use(express.json());

// Use cors middleware and allow requests from http://localhost:3001
app.use(cors());
app.use('/api',bicycleRouter)
// Define your routes here
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});