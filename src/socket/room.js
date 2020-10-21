import { code } from "./helper"

const rooms = new Map()
const sockets = new Map()

const closeRoom = (socket, roomID) => {
    socket.clients(roomID).forEach((s) => {
        s.leave(roomID)
    })
    rooms.delete(roomID)
}

const openRoom = (socket, { host, timer, international }) => {
    const roomCode = code()
    socket.to(roomCode)
    rooms.set(roomCode, {
        host: host,
        timer: timer,
        international: international,
        users: [host],
        wrong: [],
        lobby: true,
        question: "",
        answer: "",
    })
    return roomCode
}

const connect = (socket, username) => {
    sockets.set(socket.id, {username})
}

const joinRoom = (socket, roomID, username) => {
    
}

const leaveRoom = ({ roomID, username }) => {
    getRoom(roomID).users = getRoom(roomID).users.filter(user => user !== username)
}

const getRoom = (roomID) => {
    return rooms[roomID]
}

const checkRoom = (roomID) => {
    return rooms.has(roomID)
}

export { closeRoom, openRoom, getRoom, checkRoom, leaveRoom }