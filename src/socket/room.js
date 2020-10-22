import { code } from "./helper"

const rooms = new Map()

const closeRoom = (socket, code) => {
    socket.clients(code).forEach((s) => {
        s.leave(code)
    })
    rooms.delete(code)
}

const openRoom = ({ host, timer, international }) => {
    const newCode = code()
    const room = {
        code: newCode,
        host: host,
        timer: timer,
        international: international,
        users: [host],
        wrong: [],
        lobby: true,
        question: "",
        answer: "",
    }
    rooms.set(newCode, room)
    return room
}

const joinRoom = (code, username) => {
    let room = getRoom(code)
    if (room.lobby == false) {
        return
    }
    room.users.push(username)
    rooms.set(code, room)
    return room
}

const leaveRoom = ({ roomID, username }) => {
    getRoom(roomID).users = getRoom(roomID).users.filter(user => user !== username)
}

const getRoom = (code) => {
    return rooms.get(code)
}

const checkRoom = (code) => {
    return rooms.has(code)
}

export { closeRoom, openRoom, getRoom, checkRoom, leaveRoom, joinRoom }