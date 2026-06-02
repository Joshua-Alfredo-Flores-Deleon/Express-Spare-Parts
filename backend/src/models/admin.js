   import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    hireDate: {
        type: Date
    },
    birthday: {
        type: Date
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

export default model("admin", adminSchema)