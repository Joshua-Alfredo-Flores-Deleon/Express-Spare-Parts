import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }, 
    user: {
        type: String
    },
    password : {
        type: String
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model("customers", customerSchema)