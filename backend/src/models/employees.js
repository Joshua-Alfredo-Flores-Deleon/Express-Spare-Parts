import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
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
    rol: {
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

export default model("Employee", employeeSchema)