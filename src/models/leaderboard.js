import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
    user: {
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
});

const Leaderboard = model('Leaderboard', LeaderboardSchema)
export default Leaderboard