import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import Product from "../models/product.model";
import Order from "../models/orders.model";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/user.auth";


//cookie-options

export const acessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as "strict",
    maxAge: 24 * 60 * 60 * 1000
}
export const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
}


//login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }) as IUser;

        if (!email || !password) {
            res.status(404).json({ ok: false, message: "Provide Eamil and Password" });
            return;
        }
        if (!user) {
            res.status(404).json({ ok: false, message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ ok: false, message: "Invalid credentials" });
            return;
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.status(200)
            .cookie('accessToken', accessToken, acessTokenOptions)
            .cookie('refreshToken', refreshToken, refreshTokenOptions)
            .json({ ok: true, message: 'Logged In Successfully', user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
}

//register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;


        if (!email || !password || !name) {
            res.status(404).json({ ok: false, message: "Provide Eamil and Password" });
            return;
        }

        const preUser = await User.findOne({ email }) as any;

        if (preUser) {
            res.status(404).json({ ok: false, message: "User already exist" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            name,
            password: hashedPassword
        }) as IUser

        if (!user) {
            res.status(404).json({ ok: false, message: "Error while creating User" });
            return;
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.status(201)
            .cookie('accessToken', accessToken)
            .cookie('refreshToken', refreshToken)
            .json({ ok: true, message: 'User created successfully', user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
}

//all-products
export const products = async (req: Request, res: Response): Promise<void> => {
    try {

        const product = await Product.find()

        if (!product) {
            res.status(404).json({ ok: false, message: "No products found" });
            return;
        }

        res.status(200)
            .json({ ok: true, message: 'User created successfully', product });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
}

//orders
export const orders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

        const userId = req.user;
        const orders = await Order.find({ user: userId })

        if (!orders) {
            res.status(404).json({ ok: false, message: "No products found" });
            return;
        }

        if (!orders.length) {
            res.status(400)
                .json({ ok: false, message: "No orders found" })
            return;
        }

        res.status(200)
            .json({ ok: true, message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
}

//place-orders
export const placeOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { products, address } = req.body;
        const userId = req.user

        // Validate input
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            res.status(400).json({ message: "Invalid input data" });
            return
        }

        //  calculate total amount
        let totalAmount = 0;
        const productDetails = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                res.status(404).json({ message: `Product not found: ${item.productId}` });
                return
            }

            const productPrice = product.price * item.quantity;
            totalAmount += productPrice;

            productDetails.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // Create new order
        const newOrder = new Order({
            user: new mongoose.Types.ObjectId(userId),
            products: productDetails,
            totalAmount,
            paymentStatus: "pending",
            orderStatus: "pending",
            address,
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
