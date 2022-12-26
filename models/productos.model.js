import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
    id: Number,
    timestamp: String,
    productId: Number,
});

export const ProductModel = mongoose.model("productos", ProductSchema);
