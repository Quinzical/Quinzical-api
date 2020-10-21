import { authSocket } from "../middleware"
import { checkRoom, getRoom, openRoom } from "./room"



const socketIO = (socket) => {

    socket.use(authSocket);

    socket.on("joinRoom", ({ username, code }) => {
        if (checkRoom(code)) {
            joinRoom
        }
        socket.to(socket.id).emit("error", "room is closed")
    })
    socket.on("createRoom", ({ host, timer, international }) => {
        openRoom(socket, { host, timer, international })
    })
    socket.on("startGame", ({ username, code }) => {
        let room = getRoom(code)
        if (username !== room.host) {
            return
        }
        socket.to(code).emit("startingGame", room)
    })
    socket.on("answerQuestion", ({ username, code, answer }) => {

    })
    socket.on('disconnect', () => {

    })
}

export default socketIO