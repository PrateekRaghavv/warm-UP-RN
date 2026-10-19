import express from "express";
import loginuser from "../Controllers/login.js";
const router = express.Router();

// router.post("/locationdataAdd", loginuser, locationdataAdd);
router.post("/locationdataAdd", locationdataAdd);

router.post("/dataAdd", (req, res) => {
  console.log(req.body);
  res.json("Connected successfully!");
});

export default router;