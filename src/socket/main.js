import { authSocket } from "../middleware"
import { start } from "./game";
import { checkRoom, closeRoom, getRoom, openRoom, joinRoom } from "./room"
import { addUser, getSocket, getUsername, parseUsers, removeUser } from "./user";

const socketIO = (io) => {
    io.on('connection', socket => {


        socket.on('username', ({ username }) => {
            io.emit("users", parseUsers())
            console.log(username + " has joined")
            addUser(username, socket.id)
        })

        socket.on("joinRoom", async ({ code }) => {
            if (!checkRoom(code)) {
                io.to(socket.id).emit("joinRoom", "room is closed")
                return
            }
            if (socket.rooms) {
                for (const [key] of Object.entries(socket.rooms)) {
                    if (code != key) {
                        socket.leave(key)
                    }
                }
            }
            let room = await joinRoom(code, socket.id)
            
            socket.join(room.code)
            io.to(room.code).emit("joinRoom", room)
            console.log(room)
        })

        socket.on("createRoom", ({ timer, international }) => {
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
                    }
                }
            }
            socket.join(room.code)
        })

        socket.on("startGame", ({ code }) => {
            if (checkRoom(code)) {
                let room = getRoom(code)
                if (socket.id !== room.host) {
                    return
                }
                start(io, code, room)
            }
        })

        socket.on("endGame", ({ code }) => {
            if (checkRoom(code)) {
                let room = getRoom(code)
                console.log(code)
                if (username !== room.host) {
                    return
                }
                closeRoom(socket, code)
            }
        })

        socket.on("answerQuestion", ({ username, code, answer }) => {

        })

        socket.on('disconnect', () => {
            removeUser(socket.id)
        })

    })
}

export default socketIO