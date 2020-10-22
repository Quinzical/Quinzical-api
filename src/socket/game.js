import { getRoom } from "./room";

const question = "This is the capital of New Zealand"
const qualifer = "What is"
const answer = "test"

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async (io, code, room) => {
    console.log("starting")
    io.to(code).emit("startingGame", room)
    await timeout(3000);
    console.log("question")
    io.to(code).emit("question", { 
        question: question, 
        qualifer: qualifer,
        answer: answer,
    })
    await timeout(room.timer);
    console.log("end")
    io.to(code).emit("end", getRoom(room.code))
}

const wrong = (socket, code, room) => {
    room.users.filter(user => user !== username)
    room.wrong.push(user)
}

const askQuestion = async (socket, code, room) => {
    socket.to(code).emit("nextQuestion", room)
    await timeout(3000);
    socket.to(code).emit("question", { 
        question: question, 
        qualifer: qualifer,
        answer: answer,
    })
    await timeout(room.timer);
    socket.to(code).emit("timer",{
        getRoom
    })
}

export {start, wrong, askQuestion}