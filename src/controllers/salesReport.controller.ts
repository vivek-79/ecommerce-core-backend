import { Request, Response } from "express";
import Product from "../models/product.model";

// Get sales category-wise
export const getSalesByCategory = async (req: Request, res: Response) => {
    try {
        const salesData = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalSales: { $sum: "$salesCount" },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            {
                $project: {
                    categoryName: { $arrayElemAt: ["$categoryDetails.name", 0] },
                    totalSales: 1,
                },
            },
            { $sort: { totalSales: -1 } },
        ]);

        res.status(200).json({message:"Sales data fetched",ok:true,salesData});
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error fetching category-wise sales" });
    }
};

// Get top-selling products
export const getTopSellingProducts = async (req: Request, res: Response) => {
    try {
        const topProducts = await Product.find()
            .sort({ salesCount: -1 }) 
            .limit(10); 

        res.status(200).json({ message: "Sales data fetched", ok: true, topProducts });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error fetching top-selling products" });
    }
};

// Get worst-selling products
export const getWorstSellingProducts = async (req: Request, res: Response) => {
    try {
        const worstProducts = await Product.find()
            .sort({ salesCount: 1 }) 
            .limit(10); 

        res.status(200).json({ message: "Sales data fetched", ok: true, worstProducts });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error fetching worst-selling products" });
    }
};
