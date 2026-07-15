import mongoose, {Schema, model} from 'mongoose'

const carShema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "customers"
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "products"
            },
            amount: {type: Number},
            subtotal: {type: Number}
        }
    ],

    total: {type: Number},
    discount: {type: String},
    totalDiscount: {type: String}
}, {
    timestamps: true,
    strict: false,
})

export default model("Shopping_cart", carShema, "Shopping_cart")