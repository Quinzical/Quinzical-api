import { error } from '../helper';
import { Leaderboard, User } from '../models'

const getLeaderboard = async (req, res) => {
    try {
        let leaderboard = await Leaderboard.find({}).populate('user_id', 'username').sort('-score')
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const getHighScore = async (req, res) => {
    try {
        let leaderboard = await Leaderboard.find({}).populate('user_id', 'username').sort('-score')
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const postLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.auth })
        const { categories, score } = req.body
        if (categories.split(",").length != 5) {
            res.status(e.status || 500);
            res.json(error("you are dumb"))
        }
        const leaderboard = new Leaderboard({
            user_id: req.auth,
            categories: categories,
            score: score
        })
        const { id } = await leaderboard.save()

        if (user.score <= score){
            User.updateOne({ _id: req.auth }, { highscore: id })
        }
        
        res.json({ id: id })
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

export { getLeaderboard, postLeaderboard, getHighScore }