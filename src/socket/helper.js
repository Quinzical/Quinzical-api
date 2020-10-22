import { checkRoom } from "./room"

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

const checkAnswer = ({correct, userAnswer}) => {

}

export { code }