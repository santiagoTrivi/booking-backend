import { Category } from "../model/category.model";

export const createCateorySimple = async(name: string) => {
    const exists = await Category.findOne({ name });
    if (exists) return exists;

    const category = await Category.create({ name });
    return category;
};