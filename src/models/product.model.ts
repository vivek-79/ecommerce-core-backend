import mongoose, { Schema, Types } from "mongoose";

interface Product {
    name: string;
    description?: string;
    price: number;
    category: Types.ObjectId;
    stock: number;
    images?: string[]; 
    createdAt: Date;
}

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, default: 0 },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<Product>("Product", ProductSchema);
export default Product;
