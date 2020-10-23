import { checkRoom, getRoom } from "./room"

const code = () => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    if (checkRoom(result)) {
        return code()
    }
    return result
}

const checkAnswer = (code, userAnswer) => {
    let room = getRoom(code)
    let answers = trimAnswer(room.answer)
    userAnswer = trimAnswer(userAnswer)
    answers = answers.split('/')
    console.log(answers)
    console.log(userAnswer)
    console.log(answers.includes(userAnswer))
    return answers.includes(userAnswer)
}

const trimAnswer = (answer) => {
    return answer.replace(/ā/g, "a").replace(/ē/g, "e").replace(/ī/g, "i").replace(/ō/g, "o").replace(/ū/g, "u").trim().toLowerCase().replace("the ","")
}

export { code, checkAnswer }