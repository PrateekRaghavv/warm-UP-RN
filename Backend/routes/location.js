import express from "express";
import mongoose from 'mongoose';
import {user} from '../Model/trip.js'
const router = express.Router();


router.post("/add", async (req, res) => {
  try {

    const data = await user.create(req.body)
    res.status(201).json({ message: "Added successfully!" });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });

  }
});

export default router;