import { Schema, model } from "mongoose";

const suppliderSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }, 
    image: {
        type: String
    },
    public_id : {
        type: String
    },
    direcion: {
        type: String
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model("supplider", suppliderSchema)