// user.model.ts
import { Schema, Document } from 'mongoose';

export interface User extends Document {
    img: string;
    bio: string;
    name: string;
    email: string;
    // Define other fields...
}

export const UserSchema = new Schema<User>({
    img: String,
    bio: String,
    name: String,
    email: String,
    // Define other fields...
});
