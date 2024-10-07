import { Schema, Types, model, Model, Document } from "mongoose";


const CategoryMongoSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export const Category = model("category", CategoryMongoSchema);