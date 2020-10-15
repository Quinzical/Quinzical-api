import { getLeaderboard, postLeaderboard } from './leaderboard'

const getHome = async (req, res) => {
    res.send("Welcome to Quinzical API")
}

export { getLeaderboard, postLeaderboard, getHome }