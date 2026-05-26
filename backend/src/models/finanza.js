import {Schema, model} from "mongoose"

const finanzaSchema = new Schema({
    name: {type: String},
    phone : {type: String},
    image : {type: String},
    public_id : {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model ("Finanzas", finanzaSchema)
