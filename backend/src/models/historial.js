import { Schema, model } from "mongoose";

const historialSchema = new Schema({
    customerId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "customers",
    },
    ventaId: {
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

export default model("historial", historialSchema)