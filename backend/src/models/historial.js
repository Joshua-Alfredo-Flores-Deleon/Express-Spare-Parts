import { Schema, model } from "mongoose";

const historialSchema = new Schema({
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    id_venta: {
        type: Schema.Types.ObjectId,
        ref: "Ventas"
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

export default model("Historial", historialSchema)