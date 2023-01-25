import mongoose from "mongoose";
import { SellerSchema } from "../schemas/SellerSchema";

export const SellerModel = mongoose.model('Seller', SellerSchema , 'sellers');