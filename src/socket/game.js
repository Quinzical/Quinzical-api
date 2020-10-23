import { Question } from "../models";
import { getRoom, setQuestion } from "./room";

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async (io, code, room) => {
    console.log("starting")
    io.to(code).emit("startingGame", room)
    await timeout(3000);
    console.log("question")
    let question = await Question.aggregate([{$sample: {size: 1}}])
    console.log(question)
    io.to(code).emit("question", { 
        question: question[0].question, 
        qualifier: question[0].qualifier,
        answer: question[0].answer,
    })
    setQuestion(code, question[0].question, question[0].qualifier, question[0].answer)
    await timeout(room.timer);
    io.to(code).emit("end", getRoom(room.code))
}

export {start}