import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { env } from "../constants";
import jwt from 'jsonwebtoken'

interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "superadmin";
    createdAt: Date;
    generateAccessToken: () => string;
    generateRefreshToken:()=>string;
}

const AdminSchema = new Schema<IAdmin>({
    name: { type: String, required: true ,default:'Admin'},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


AdminSchema.methods.generateAccessToken = function():string{

    return(
        jwt.sign(
            {
                id:this._id,
                email:this.email,
                role:this.role
            },
            env.accessTokenSecret,
            {
                expiresIn: "1d"
            }
        )
    )
};

AdminSchema.methods.generateRefreshToken = function():string{

    return(
        jwt.sign(
            {
                id:this._id,
                email:this.email
            },
            env.refreshTokenSecret,
            {
                expiresIn: "7d"
            }
        )
    )
};

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
