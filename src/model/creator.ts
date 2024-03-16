// user.model.ts
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
    img: string;
    bio: string;
    name: string;
    email: string;
    // Define other fields...
}

const userSchema = new Schema<User>({
    img: String,
    bio: String,
    name: String,
    email: String,
    // Define other fields...
});

export const UserModel = model<User>('User', userSchema);
