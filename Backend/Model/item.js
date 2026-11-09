import mongoose from 'mongoose'

const schema = mongoose.Schema({
    name :{
        type: String,
        required: true
    },
      QTY :{
        type: Number,
        required: true
    },
      ItemUrl :{
        type: String,
        required: true
    },
      Brand :{
        type: String,
        required: false
    },
      Country :{
        type: String,
        required: true
    },
      City :{
        type: String,
        required: false
    }
})

export const user = mongoose.model('itembases', schema);