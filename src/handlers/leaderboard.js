import { Leaderboard } from '../models'

const getLeaderboard = async (req, res) => {
    let leaderboard = await Leaderboard.find({});
    res.send(leaderboard)
}

const postLeaderboard = async (req, res) => {
    const leaderboard = new Leaderboard(req.body)
    const { id } = await leaderboard.save()
    res.send({id: id})
}

export { getLeaderboard, postLeaderboard }