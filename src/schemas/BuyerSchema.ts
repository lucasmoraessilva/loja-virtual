import { Schema } from "mongoose";

export const BuyerSchema = new Schema({
    _uid: {
        type: String,
        unique: true,
        required: true
    },
    _name: {
        type: String,
        required: true,
    },
    _email: {
        type: String,
        required: true,
        unique: true
    },
    _password: {
        type: String,
        required: true,
    }
});