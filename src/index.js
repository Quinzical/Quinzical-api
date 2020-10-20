import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import socket from 'socket.io'
import http from 'http'

import {
    getLeaderboard, postLeaderboard, getHighScore,
    getHome, unimplemented,
    postRegister, postLogin, getSelf
} from './handlers'

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

app.post('/host', unimplemented)
app.get('/lobby', unimplemented)

app.get('/self', auth, getSelf)
app.post('/login', postLogin)
app.post('/register', postRegister)

const server = http.createServer(app)
const io = socket(server)

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    client.set("mastersocket", socket.id, function(err) {
        if (err) throw err;
        console.log("Master socket is now" + socket.id);
      });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Quinzical app listening at http://localhost:${port}`)
})

