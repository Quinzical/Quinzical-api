import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
});

const Category = model('Category', CategorySchema)
export default Category