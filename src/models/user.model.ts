import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../constants';

export interface IUser{
    name?: string;
    email: string;
    password: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        country: string;
    };
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
}



const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, default:'New User' },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
        }
    },
    { timestamps: true }
);

// Hash password before saving

UserSchema.pre('save',async function(next){

    if (!this.isModified('password')) return next();
   
     try {
         this.password = bcrypt.hash(this.password as string, 10);
         next();
     } catch (error:any) {
        next(error)
     }
   
   next();
})


//methods to generate tokens 

UserSchema.methods.generateAccessToken = function():string{

    return(
        jwt.sign(
            {
                id:this._id,
                email:this.email
            },
            env.accessTokenSecret,
            {
                expiresIn: "1d"
            }
        )
    )
};

UserSchema.methods.generateRefreshToken = function():string{

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

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
