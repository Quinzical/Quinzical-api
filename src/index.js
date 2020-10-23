import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import socket from 'socket.io'
import http from 'http'
import cors from 'cors'
import socketIO from './socket/main'

import {
    getLeaderboard, postLeaderboard, getHighScore,
    getHome,
    postRegister, postLogin, getSelf, getAllRooms
} from './handlers'

import { auth } from './middleware'
import { Category, Question } from './models'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(cors())

app.get('/', getHome)
app.get('/leaderboard', getLeaderboard)
app.get('/highscore', getHighScore)
app.post('/leaderboard', auth, postLeaderboard)

app.get('/rooms', getAllRooms)

app.get('/self', auth, getSelf)
app.post('/login', postLogin)
app.post('/register', postRegister)



const server = http.createServer(app)
const io = socket(server)

socketIO(io)


server.listen(port, () => {
    console.log(`Quinzical app listening at http://localhost:${port}`)
})

