import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { getLeaderboard, postLeaderboard, getHighScore, getHome, postRegister, postLogin } from './handlers'
import { auth } from './middleware'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', getHome)
app.get('/leaderboard', getLeaderboard)
app.get('/highscore', getHighScore)
app.post('/leaderboard', auth, postLeaderboard)

app.post('/login', postLogin)
app.post('/register', postRegister)


app.listen(port, () => {
    console.log(`Quinzical app listening at http://localhost:${port}`)
})

