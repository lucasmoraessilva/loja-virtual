import mongoose from "mongoose";
import { BuyerSchema } from "../schemas/BuyerSchema";

export const BuyerModel = mongoose.model('Buyer', BuyerSchema , 'buyers');