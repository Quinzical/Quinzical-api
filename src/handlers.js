import Leaderboard from './mongoose'

const getLeaderboard = async (req, res) => {
    let leaderboard = await Leaderboard.find({});
    res.send(leaderboard)
}

const postLeaderboard = async (req, res) => {
    console.log(req.body)
    //TODO
    //await Leaderboard.updateOne(req.body)
    res.send(req.body)
}

export { getLeaderboard, postLeaderboard }