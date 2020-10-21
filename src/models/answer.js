import { Schema, model } from 'mongoose'

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true,
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
}, {
    timestamps: true
});

const Answer = model('Answer', AnswerSchema)
export default Answer