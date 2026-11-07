import mongoose from 'mongoose'
const schema = mongoose.Schema({
    Departure:{
        city: {
            type: String,
            required: true
        },
        date:  {
            type: Date,
            required: false
        }
        
    },
    Arrival:{
        city:  {
            type: String,
            required: true
        },
        date:  {
            type: Date,
            required: false
        }
    }
})

export const user = mongoose.model("TripDetails", schema)
