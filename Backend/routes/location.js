import express from "express";
import mongoose from 'mongoose';
import { user } from '../Model/trip.js'
const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const data = await user.create(req.body)
    console.log("added")
    res.status(201).json({ message: "Added successfully!" });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });

  }
});

router.put("/updatetrip", async (req, res) => {
  const {_id, ...updates} =req.body // updates is used to not to save the database with _id bu this id and other data are seprated.
  try {
    const data = await user.findByIdAndUpdate(_id, updates, {new: true, runValidators: true});
    res.status(201).json({ data })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.delete("/deletetrip", async (req, res) => {
  const {_id} =req.body // updates is used to not to save the database with _id bu this id and other data are seprated.
  console.log(_id)
  try {
    const data = await user.findByIdAndDelete(_id);
    res.status(201).json({ data })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


router.get("/viewtrips", async (req, res) => {
  try {
    const data = await user.find({})
    res.status(201).json({ data })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});


export default router;