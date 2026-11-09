import express from "express"
import { user } from '../Model/item.js'

const router = express.Router()

router.post('/addorder', async (req, res) => {
    try {
        await user.create(req.body);
        console.log("data added")
        res.status(201).json({ message: "data added successfuly" })
    }
    catch (error) {
        console.log("data not added")

        res.status(500).json({ message: "nope" })
    }
})

export default router