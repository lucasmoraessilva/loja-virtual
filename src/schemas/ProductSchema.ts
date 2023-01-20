import { Types } from "mongoose";

export const ProductSchema = {
    _uid: {
        type: String,
        unique: true,
        required: true
    },
    _name: {
        type: String,
        required: true,
        unique: true,
    },
    _description: {
        type: String,
        required: true,
    },
    _price: {
        type: Number,
        required: true,
    },
    _images: [{
        type: String,
        required: true,
    }],
    _status: {
        type: Number,
        required: true,
        enum: [0,1]
    },
    _sells: {
        type: [Types.ObjectId],
        ref: 'Sale',
        required: false
    }
};