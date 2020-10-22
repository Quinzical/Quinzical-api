import { code } from "./helper"

const rooms = new Map()

const closeRoom = (io, socket, code) => {
    if (typeof socket?.clients === "function") {
        socket?.clients(code)?.forEach((s) => {
            io.to(s.id).emit('error', 'closing lobby')
            s.leave(code)
        })
        rooms.delete(code)
    }
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

const leaveRoom = (io, socket) => {
    rooms.forEach((value, key) => {
        if (socket.id === value.host) {
            closeRoom(io, socket, key)
            return
        }
        value.users = value.users.filter(user => user !== socket.id)
        rooms.set(key, value)
    })
}

const getRoom = (code) => {
    return rooms.get(code)
}

const getRooms = () => {
    return Object.fromEntries(rooms);
}

const checkRoom = (code) => {
    return rooms.has(code)
}

export { closeRoom, openRoom, getRoom, checkRoom, leaveRoom, joinRoom, getRooms }