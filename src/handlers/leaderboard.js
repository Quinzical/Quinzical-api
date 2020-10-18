import { error } from '../helper';
import { Leaderboard } from '../models'

const getLeaderboard = async (req, res) => {
    try {
        let leaderboard = await Leaderboard.find({}).populate('user_id', 'username').sort('-score');
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const getHighScore = async (req, res) => {
    try {
        let leaderboard = await Leaderboard.find({}).populate('user_id', 'username').sort('-score');
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const postLeaderboard = async (req, res) => {
    try {
        const leaderboard = new Leaderboard(req.body)
        const { id } = await leaderboard.save()
        res.json({ id: id })
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

export { getLeaderboard, postLeaderboard, getHighScore }