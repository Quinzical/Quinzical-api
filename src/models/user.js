import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    highscore: {
        type: Schema.Types.ObjectId,
        ref: 'Leaderboard'
    },
}, {
    timestamps: true
});

const User = model('User', UserSchema)
export default User