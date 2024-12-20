import mongoose from "mongoose";

const packetSchema = mongoose.Schema({
    packetName: {
        type: String,
        required: true
    },
    text1: {
        type: String,
        required: true
    },
    text2: {
        type: String,
        required: true
    },
    text3: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
   category : {
        type: String,
        require: true
   }
}, {timestamps : true})

const Packet = mongoose.model('Packet', packetSchema);
export default Packet;