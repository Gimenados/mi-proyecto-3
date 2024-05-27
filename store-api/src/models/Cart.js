import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    items: [{
        quantity: {
            type: Number,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Products", // Asegúrate de que el nombre de la referencia coincide con el nombre del modelo de productos
            required: true
        }
    }]
}, {timestamps: true});

export const Cart = model("Cart", CartSchema);
