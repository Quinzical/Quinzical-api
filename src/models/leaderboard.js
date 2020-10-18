import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Leaderboard = model('Leaderboard', LeaderboardSchema)
export default Leaderboard