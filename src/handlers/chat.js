import { sendMessage } from "..";
import { error } from "../helper";
import { Chat } from "../models";

const getChatHistory = async (req, res) => {
    try {
        let leaderboard = await Chat.find({}).populate('user_id', 'username').limit(5).sort('-updatedAt')
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const getChatAll = async (req, res) => {
    try {
        let leaderboard = await Chat.find({}).populate('user_id', 'username').sort('-updatedAt')
        res.json(leaderboard)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const postChat = async (req, res) => {
    try {
        const { message } = req.body
        const chat = new Chat({
            user: req.auth,
            message: message,
        })
        const { id } = await chat.save()
        sendMessage(message)
        res.json({ id: id })
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

export { getChatAll, getChatHistory, postChat }