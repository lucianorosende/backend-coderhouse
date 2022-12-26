import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String | Number,
    password: String | Number,
});

export const UserModel = mongoose.model("users", UserSchema);
