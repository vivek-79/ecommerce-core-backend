import mongoose, { Schema } from "mongoose";

interface Category{
    name: string;
    description?: string;
    createdAt: Date;
}

const CategorySchema = new Schema<Category>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<Category>("Category", CategorySchema);
export default Category;
