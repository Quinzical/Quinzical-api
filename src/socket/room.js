import { code } from "./helper"

const rooms = new Map()


const closeRoom = (socket, roomID) => {
    socket.clients(roomID).forEach((s) => {
        s.leave(roomID)
    })
    rooms.delete(roomID)
}

const openRoom = (socket, { hostID, timer, international }) => {
    const roomCode = code()
    socket.to(roomCode)
    rooms.set(roomCode, {
        hostID: hostID,
        timer: timer,
        international: international,
        users: [ hostID ],
    })
}

const getRoom = (roomID) => {
    return rooms[roomID]
}

export { closeRoom, openRoom, getRoom }