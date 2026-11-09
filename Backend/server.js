import express from 'express';
import locationRoutes from './routes/location.js';
import itemRoutes from './routes/item.js';

import './config/db.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.url);
    console.log(req.method);

    next()
})
app.use('/TripData', locationRoutes);
app.use('/order', itemRoutes);



app.listen(8080, () => {
    console.log('Server running on port 8080');
});