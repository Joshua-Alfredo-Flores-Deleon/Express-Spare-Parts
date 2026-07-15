import mongoose, { Schema, model } from "mongoose";

const historialSchema = new Schema({
    id_venta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venta"
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Completado"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Historial", historialSchema, "Historial")
