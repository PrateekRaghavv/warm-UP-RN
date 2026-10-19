import express from 'express';
import locationRoutes from './routes/location.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/TravelingDetails', locationRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});