import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    full_name: {
        type: String
    },
    email: {
        type: String
    },
    phone_number: {
        type: String
    },
    user: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Customer", customerSchema)