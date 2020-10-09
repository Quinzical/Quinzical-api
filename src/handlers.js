let leaderboard = [
    {
        name: "User1",
        score: 100,
    }, {
        name: "Test2",
        score: 90,
    }, {
        name: "Test3",
        score: 80,
    }, {
        name: "Test4",
        score: 70,
    }, {
        name: "Test5",
        score: 60,
    },
]

const getLeaderboard = (req, res) => {
    res.send(leaderboard)
}

const postLeaderboard = (req, res) => {
    console.log(req.body)
    leaderboard.push(req.body)
    res.send('Hello World test!')
}

export { getLeaderboard, postLeaderboard }