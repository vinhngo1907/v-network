import mongoose from 'mongoose';

export const createCollection = async (name: string) => {
    const isExist = await mongoose.connection.db.listCollections({ name: name.toLowerCase() }).next();
    if (!isExist) {
        await mongoose.connection.db.createCollection(name.toLowerCase());
    }
};