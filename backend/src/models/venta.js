import {Schema, model} from "mongoose"

const ventaSchema = new Schema({
    name: {type: String},
    phone : {type: String},
    image : {type: String},
    public_id : {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model ("Ventas", ventaSchema)
