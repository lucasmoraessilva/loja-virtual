import mongoose from "mongoose";
import { ProductSchema } from "../schemas/ProductSchema";

export const ProductModel = mongoose.model('', ProductSchema);