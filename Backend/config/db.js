import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URL = process.env.MONGODB_URI;
let result = await mongoose.connect(DB_URL);

console.log("connected mongodb"); 