import { authSocket } from "../middleware"
import { start } from "./game";
import { checkRoom, getRoom, openRoom } from "./room"



const socketIO = (io) => {
    io.on('connection', socket => {



        //socket.use(authSocket);

        socket.on("test", data => {
            console.log(data)
        })

        socket.on("joinRoom", (callback, { username, code }) => {
            if (checkRoom(code)) {
            }
            if (socket.rooms !== undefined) {
                socket.rooms.map(room => socket.leave(room))
            }
            socket.join(code)
            io.emit("joinRoom", "room is closed")
        })

        socket.on("createRoom", ({ host, timer, international }) => {
            let newRoomID = openRoom(socket, { host, timer: timer * 1000, international })
            console.log("room: " + newRoomID + " has been created")
            io.emit("createRoom", newRoomID)
            socket.join(newRoomID)
        })

        socket.on("startGame", ({ username, code }) => {
            let room = getRoom(code)
            if (username !== room.host) {
                return
            }
            start(socket, code, room)
        })

        socket.on("answerQuestion", ({ username, code, answer }) => {

        })

        socket.on('disconnect', () => {
            console.log(socket.id)
        })

    })
}

export default socketIO