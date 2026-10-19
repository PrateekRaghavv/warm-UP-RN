import express from 'express';

import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

app.post('/TravelingDetails', (req, res) => {
    console.log(req.body);
    res.json('Connected successfully!');
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Server running on port 8080');
});