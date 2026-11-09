import mongoose from 'mongoose'
const schema = mongoose.Schema({
    Departure:{
        city: {
            type: String,
            required: true
        },
        date:  {
            type: Date,
            required: true
        }
        
    },
    Arrival:{
        city:  {
            type: String,
            required: true
        },
        date:  {
            type: Date,
            required: true
        }
    }
})

export const user = mongoose.model("TripDetails", schema)
