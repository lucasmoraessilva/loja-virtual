import { ProductSchema } from "./ProductSchema";

export const SellerSchema = {
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
    },
    _products: {
        type: [ProductSchema],
        required: false,
    }
}