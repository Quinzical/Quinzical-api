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
    postRegister, postLogin, getSelf, getAllRooms, getImage, postImage, getImages
} from './handlers'

import { auth } from './middleware'
import { getChatAll, getChatHistory, postChat } from './handlers/chat'

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

app.get('/allchat', getChatAll)
app.get('/chat', getChatHistory)
app.post('/chat', auth, postChat)

app.get('/image', auth, getImage)
app.get('/images', getImages)
app.post('/image', auth, postImage)


const server = http.createServer(app)
const io = socket(server)

const sendMessage = (message) => {
    io.emit("message", { message: message })
}

socketIO(io)


server.listen(port, () => {
    console.log(`Quinzical app listening at http://localhost:${port}`)
})

export { sendMessage }
