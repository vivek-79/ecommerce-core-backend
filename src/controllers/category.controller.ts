import { Request, Response } from "express";
import Category from "../models/category.model";



// Add a Category
export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.json({ message: "Category name is required", ok: false });
            return;
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            res.json({ message: "Category already exists", ok: false });
            return;
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.json({ message: "Category added successfully",newCategory, ok: true });
    } catch (error) {
        res.json({ message: "Failed to add category", ok: false });
    }
};

// Update a Category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            res.json({ message: "New category name is required", ok: false });
            return;
        }

        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!category) {
            res.json({ message: "Category not found", ok: false });
            return;
        }

        res.json({ message: "Category updated successfully", category,ok: true });
    } catch (error) {
        res.json({ message: "Failed to update category", ok: false });
    }
};

// Delete a Category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.json({ message: "Category not found", ok: false });
            return;
        }

        res.json({ message: "Category deleted successfully", ok: true });
    } catch (error) {
        res.json({ message: "Failed to delete category", ok: false });
    }
};

// List All Categories
export const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json({ message: "Categories fetched successfully", categories, ok: true });
    } catch (error) {
        res.json({ message: "Failed to fetch categories", ok: false });
    }
};
