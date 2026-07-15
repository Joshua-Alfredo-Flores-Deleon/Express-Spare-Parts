import {Schema, model} from "mongoose"

const ventaSchema = new Schema({
    cartId:
    {type: Schema.Types.ObjectId,
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

export default model ("Venta", ventaSchema ,"Venta")
