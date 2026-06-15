import {Schema, model} from "mongoose"

const ventaSchema = new Schema({
    cartId: 
    {type: mongoose.Schema.Types.ObjectId,
       ref: "cart",},
    delivery : 
    {type: String},
    paymentMethod : 
    {type: String},
    paymenStatua : 
    {type: Boolean}
}, {
    timestamps: true,
    strict: false
})

export default model ("Ventas", ventaSchema)
