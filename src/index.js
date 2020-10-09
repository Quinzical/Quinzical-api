import express from 'express'
import bodyParser from 'body-parser'
import { getLeaderboard, postLeaderboard } from './handlers'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const main = () => {
    const app = express()
    const port = 3000

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    app.get('/leaderboard', getLeaderboard)
    app.post('/leaderboard', postLeaderboard)



    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

main()
