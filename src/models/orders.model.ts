import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: {
        productId: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    paymentStatus: "pending" | "paid" | "failed";
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
    },
    { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
