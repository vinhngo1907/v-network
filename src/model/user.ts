import { Schema, Document, model } from 'mongoose';
import { TUserDeviceInfo } from "src/types";
import { createCollection } from './schema';

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

export const UserSchema = new Schema<User>({
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

export const UserModel = model<User>('user', UserSchema);

// Define other schemas similarly
export interface Device extends Document {
    userId: String,
    deviceIp: String,
    createdAt: Date,
    deviceName: String,
    deviceLocation: String
}

const DeviceSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        deviceIp: String,
        createdAt: Date,
        deviceName: String,
        deviceLocation: String
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v
            }
        }
    }
);

export const DeviceModel = model<Device>('device', DeviceSchema);

// Define user block list schema
export interface UserBlockList extends Document {
    userId: string;
    userTargetId: string;
}

const UserBlockListSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userTargetId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v
            }
        }
    }
);

export const UserBlockListModel = model<UserBlockList>('UserBlockList', UserBlockListSchema);

// Define e2e content schema
export const e2eContent = (tableName: string) => {
    createCollection(tableName);
};

export interface ListOfUserChannel extends Document {
    userId: String,
    channelId: String,
}

const ListOfUserChannelSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    channelId: { type: Schema.Types.ObjectId, ref: "Channel" },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        }
    }
});

export const ListOfUserChannelModel = model<ListOfUserChannel>('ListOfUserChannel', ListOfUserChannelSchema);

export interface ListOfUserChannel extends Document {
    toUser: String,
    fromUser: String,
    userId: String,
    tblChatId: String
}

const ListOfUserE2ESchema: Schema = new Schema({
    toUser: String,
    fromUser: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tblChatId: String
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        }
    }
});

export const ListOfUserE2EModel = model<ListOfUserChannel>('ListOfUserChannel', ListOfUserE2ESchema);