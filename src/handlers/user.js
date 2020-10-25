import { comparePassword, createJWT, error, hashPassword } from '../helper'
import { User } from '../models'

const getSelf = async (req, res) => {
    const user = await User.findOne({ _id: req.auth }).select('-password').exec();
    if (user == null) {
        res.status(401);
        res.json(error("username not exist"))
    }
    res.json(user)
}

const postRegister = async (req, res) => {
    try {
        const { username, password } = req.body
        if (username == '') {
            res.status(401);
            res.json(error("username is empty"))
            return
        }
        if (password == '' || password.length < 6) {
            res.status(402);
            res.json(error("password is empty or too short"))
            return
        }
        const user = new User({ username: username, password: await hashPassword(password) })

        const { id } = await user.save()
        res.json({ id: id, username: username, bearer: createJWT(id) })

    } catch (e) {
        if (e.code == 11000) {
            res.status(403);
            res.json(error("username is duplicated"))
            return
        }
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username }).exec();

        if (!await comparePassword(password, user.password)) {
            res.status(401);
            res.json(error("incorrect login details"))
            return
        }
        res.json({ id: user.id, username: user.username, bearer: createJWT(user.id) })
    } catch (e) {
        if (e.code == 11000) {
            res.status(403);
            res.json(error("incorrect login details"))
            return
        }
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

export { postRegister, postLogin, getSelf }