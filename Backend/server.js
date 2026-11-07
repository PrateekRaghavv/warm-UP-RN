import express from 'express';
import locationRoutes from './routes/location.js';
import './config/db.js';
import cors from 'cors';
const URL = process.env.MONGODB_URI; //for local development



const app = express();
app.use(cors());
app.use(express.json());

 
app.use('/TripData', locationRoutes);


app.listen(8080, () => {
    console.log('Server running on port 8080');
});