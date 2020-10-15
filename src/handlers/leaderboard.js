import { Leaderboard } from '../models'

const getLeaderboard = async (req, res) => {
    let leaderboard = await Leaderboard.find({});
    res.send(leaderboard)
}

const postLeaderboard = async (req, res) => {
    console.log(req.body)
    const leaderboard = new Leaderboard(req.body)
    const { id } = await leaderboard.save()
    res.send(req.body)
}

export { getLeaderboard, postLeaderboard }