import { Schema, Document, model } from 'mongoose';
import { TUserDeviceInfo } from "src/types";

export interface User extends Document {
    img: string;
    bio: string;
    name: string;
    email: string;
    phone: String;
    apiKey: String;
    authCode: Number;
    username: String;
    password: String;
    lastName: String;
    isActive: Boolean;
    hasLogout: Boolean;
    defaultColor: String;
    twoStepVerification: Boolean
    // Define other fields...
}

export const userSchema = new Schema<User>({
    img: String,
    bio: String,
    name: String,
    email: String,
    apiKey: String,
    authCode: Number,
    username: String,
    password: String,
    lastName: String,
    isActive: Boolean,
    hasLogout: Boolean,
    defaultColor: String,
    twoStepVerification: Boolean
    // Define other fields...
});

export const UserModel = model<User>('User', userSchema);