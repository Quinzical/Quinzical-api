import { getLeaderboard, postLeaderboard } from './leaderboard'
import { postLogin, postRegister } from './user'

const getHome = async (req, res) => {
    res.send("Welcome to Quinzical API")
}

export { getLeaderboard, postLeaderboard, getHome, postLogin, postRegister }