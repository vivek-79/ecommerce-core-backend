import { Request, Response } from "express";
import Product from "../models/product.model"; // Adjust path as needed
import Category from "../models/category.model";

//  Add a Product
export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        if (!name || !price || !category) {
            res.json({ message: "Name, price, and category are required", ok: false });
            return;
        }

        // Check if category exists
        const categoryExists = await Category.findOne({name:category});
        if (!categoryExists) {
            res.json({ message: "Category not found", ok: false });
            return;
        }

        const newProduct = new Product({ name, description, price, category:categoryExists._id, stock, images });
        await newProduct.save();

        res.json({ message: "Product added successfully",newProduct, ok: true });
    } catch (error) {
        res.json({ message: "Failed to add product", ok: false });
    }
};

// Update a Product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, images } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, images }, { new: true });

        if (!product) {
            res.json({ message: "Product not found", ok: false });
            return;
        }

        res.json({ message: "Product updated successfully", product, ok: true });
    } catch (error) {
        res.json({ message: "Failed to update product", ok: false });
    }
};

// Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.json({ message: "Product not found", ok: false });
            return;
        }

        res.json({ message: "Product deleted successfully", ok: true });
    } catch (error) {
        res.json({ message: "Failed to delete product", ok: false });
    }
};

// List All Products
export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("category", "name");
        res.json({ message: "Products fetched successfully", products, ok: true });
    } catch (error) {
        res.json({ message: "Failed to fetch products", ok: false });
    }
};
