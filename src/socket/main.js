import { start } from "./game";
import { checkAnswer } from "./helper";
import { checkRoom, closeRoom, getRoom, openRoom, joinRoom, leaveRoom, setStart, addCorrect, setLobby } from "./room"
import { addUser, parseUsers, removeUser } from "./user";

const socketIO = (io) => {
    io.on('connection', socket => {

        socket.on('username', ({ username }) => {
            console.log(username + " has joined")
            addUser(username, socket.id)
            io.emit("users", parseUsers())
        })

        socket.on("joinRoom", async ({ code }) => {
            console.log(code)
            if (!checkRoom(code)) {
                io.to(socket.id).emit("error", "room is closed")
                return
            }

            let room = await joinRoom(code, socket.id)
            console.log(room)
            if (room == null) {
                console.log(room)
                io.to(socket.id).emit("error", "room already started")
                return
            }
            if (socket.rooms) {
                for (const [key] of Object.entries(socket.rooms)) {
                    if (code != key) {
                        socket.leave(key)
                        socket.join(socket.id)
                    }
                }
            }
            socket.join(room.code)
            io.to(room.code).emit("joinRoom", room)
            console.log(room)
        })

        socket.on("createRoom", ({ timer, international }) => {
            console.log({ timer, international })
            let room = openRoom({
                host: socket.id,
                timer: timer * 1000,
                international: international
            })
            console.log("room: " + room.code + " has been created")
            io.to(socket.id).emit("createRoom", room)
            if (socket.rooms) {
                for (const [key] of Object.entries(socket.rooms)) {
                    if (room.code != key) {
                        socket.leave(key)
                        socket.join(socket.id)
                    }
                }
            }
            socket.join(room.code)
        })

        socket.on("restartRoom", ({ code }) => {
            let room = getRoom(code)
            io.to(room.code).emit("restartRoom", room)
            setLobby(code, true)
            setStart(code, false)
        })

        socket.on("startGame", async ({ code }) => {
            if (checkRoom(code)) {
                let room = getRoom(code)
                if (room.users.length <= 1) {
                    return
                }
                if (socket.id !== room.host) {
                    return
                }
                if (room.start) {
                    return
                }
                console.log("starting: " + code)
                setStart(code, true)
                await start(io, code, room)
                console.log("end")
            }
        })

        socket.on("endGame", ({ code }) => {
            if (checkRoom(code)) {
                let room = getRoom(code)
                console.log(code)
                if (username !== room.host) {
                    return
                }
                closeRoom(io, code)
            }
        })

        socket.on("answer", ({ answer, code }) => {
            if (checkRoom(code)) {
                if (checkAnswer(code, answer)) {
                    console.log(checkAnswer(code, answer))
                    addCorrect(code, socket.id)
                }
            }
        })

        socket.on("leaveRoom", ({code}) => {
            console.log(code)
            socket.leave(code)
            socket.join(socket.id)
            leaveRoom(io, socket)
        });

        socket.on('disconnect', () => {
            removeUser(socket.id)
            leaveRoom(io, socket)
        })

        socket.on('admin', () =>{
            socket.join('admin')
        })
    })
}

export default socketIO