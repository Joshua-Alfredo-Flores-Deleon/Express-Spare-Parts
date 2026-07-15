import mongoose, { Schema, model } from 'mongoose'

const promocionSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    status: { type: Boolean, default: true }
}, {
    timestamps: true,
    strict: false,
})

export default model("promocion", promocionSchema)
