

import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import { acessTokenOptions, refreshTokenOptions } from "./user.controller";


export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required", ok: false });
            return;
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(401).json({ message: "Invalid credentials", ok: false });
            return;
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(400).json({ ok: false, message: "Invalid credentials" });
            return;
        }

        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        res.status(200)
            .cookie('accessToken', accessToken, acessTokenOptions)
            .cookie('refreshToken', refreshToken, refreshTokenOptions)
            .json({ ok: true, message: 'Logged In Successfully', user: { name: admin.name, email: admin.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", ok: false });
    }
};
