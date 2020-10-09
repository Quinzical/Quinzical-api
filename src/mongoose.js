import { Schema, model } from 'mongoose'

const LeaderboardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true,
    },
});

const Leaderboard = model('Leaderboard', LeaderboardSchema)
export default Leaderboard