import {Schema, model} from "mongoose"

const finanzaSchema = new Schema({
    monthlyEarnings: {type: String},
    monthlyLosses : {type: String},
    monthlyPnl : {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model ("Finance", finanzaSchema, "Finance")
