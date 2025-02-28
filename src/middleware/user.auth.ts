import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../constants";
import User from "../models/user.model";

export interface AuthRequest extends Request {
    user?: any; // Attach user data to the request
}

const userAuthMiddleware =async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        
        const token = req.cookies?.accessToken || "";
        if (!token) {
             res.status(401).json({ message: "Access Denied. No token provided." });
            return
        }

        // Verify token
        const decodedInfo = jwt.verify(token, env.accessTokenSecret) as any

        if(!decodedInfo){
            res.status(401).json({ message: "Access Denied. Token Expired" });
            return
        }
        const user = await User.findById(decodedInfo.id).select('-password -refreshToken')
        if (!user) {
             res.status(400)
                .json({ message:'Unauthorized', ok:false})
            return
        }
        req.user = user._id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userAuthMiddleware;
