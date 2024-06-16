import mongoose from "mongoose";

export const isValidMongoId = (givenId: string): boolean => {
    return  mongoose.isValidObjectId(givenId);
}