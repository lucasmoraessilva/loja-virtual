import { Types } from "mongoose";

export const SaleSchema = {
    _uid: {
        type: String,
        unique: true,
        required: true
    },
    _buyer: {
        type: Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    _products: {
        type: [Types.ObjectId],
        ref: 'Product',
        required: true
    }
}