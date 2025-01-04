import { model, Schema, Document } from "mongoose";
export interface Group extends Document {
    img: String,
    name: String,
    inviteLink: String,
    publicLink: String,
    description: String,
    defaultColor: String
}

export const GroupSchema = new Schema<Group>({
    img: String,
    name: String,
    inviteLink: String,
    publicLink: String,
    description: String,
    defaultColor: String
});

export const GroupModel = model<Group>('group', GroupSchema);