import { Schema, model } from 'mongoose'

const ImageSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUri: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Image = model('Image', ImageSchema)
export default Image