import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    customerId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "customers",
    },
    customerId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Ventas",
    },
    date: {
        type: Date
    },
    status: {
        type: Boolean
    },
    
}, {
    timestamps: true,
    strict: false
})

export default model("products", productsSchema)