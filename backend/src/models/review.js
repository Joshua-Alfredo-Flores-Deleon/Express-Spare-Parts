import { Schema, model } from "mongoose";

const historialSchema = new Schema({
    ranking:{
        type: String
    },
    title: {
        type: String
    },
    experence : {
        type: String
    },
    details: {
        type: String
    },
    customerId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "customers",
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model("historial", historialSchema)