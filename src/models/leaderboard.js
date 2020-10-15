import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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