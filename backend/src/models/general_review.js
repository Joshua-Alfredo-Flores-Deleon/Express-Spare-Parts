import { Schema, model } from "mongoose";

const generalReviewSchema = new Schema({
    ranking: {
        type: Number,
        min: 1,
        max: 5
    },
    title: {
        type: String
    },
    experience_type: {
        type: String
    },
    details: {
        type: String
    },
    id_customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    status: {
        type: String,
        default: "Activo"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("General_review", generalReviewSchema)
