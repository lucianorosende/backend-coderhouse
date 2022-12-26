import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    cartId: Number,
    timestamp: String,
    productos: Array,
});

export const CartModel = mongoose.model("carritos", CartSchema);
