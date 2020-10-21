import { Schema, model } from 'mongoose'

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    qualifier: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, {
    timestamps: true
});

const Question = model('Question', QuestionSchema)
export default Question