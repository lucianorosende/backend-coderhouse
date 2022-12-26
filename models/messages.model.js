import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        apellido: String,
        edad: String,
        alias: String,
        avatar: String,
    },
    text: String,
    day: String,
    hour: String,
});

export const MessageModel = mongoose.model("messages", MessageSchema);
