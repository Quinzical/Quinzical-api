import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { getLeaderboard, postLeaderboard } from './handlers'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, { 
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const app = express()
const port = process.env.PORT

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/leaderboard', getLeaderboard)
app.post('/leaderboard', postLeaderboard)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

