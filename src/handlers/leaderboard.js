import { Leaderboard } from '../models'

const getLeaderboard = async (req, res) => {
    try {
        let leaderboard = await Leaderboard.find({});
        res.send(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json({
            error: {
                message: "An internal error has occurred",
            },
        });
        console.log(e);
    }
}

const postLeaderboard = async (req, res) => {
    try {
        const leaderboard = new Leaderboard(req.body)
        const { id } = await leaderboard.save()
        res.send({ id: id })
    } catch (e) {
        res.status(e.status || 500);
        res.json({
            error: {
                message: "An internal error has occurred",
            },
        });
        console.log(e);
    }
}

export { getLeaderboard, postLeaderboard }