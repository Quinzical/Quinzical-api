import { comparePassword, hashPassword } from '../helper'
import { User } from '../models'

const postRegister = async (req, res) => {

    try {

        const { username, password } = req.body
        if (username == '') {
            res.status(401);
            res.json({
                error: {
                    message: "Username is empty",
                },
            })
            return
        }
        if (password == '' || password.length < 6) {
            res.status(402);
            res.json({
                error: {
                    message: "Password is empty or too short",
                },
            })
            return
        }

        const user = new User({ username: username, password: await hashPassword(password) })
        const { id } = await user.save()

        res.send({ id: id })
    } catch (e) {
        if (e.code == 11000) {
            res.status(403);
            res.json({
                error: {
                    message: "Username is duplicated",
                },
            })
            return
        }
        res.status(e.status || 500);
        res.json({
            error: {
                message: "An internal error has occurred",
            },
        })
        console.log(e);
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username }).exec();

        if (!await comparePassword(password, user.password)) {
            res.status(401);
            res.json({
                error: {
                    message: "Incorrect login details",
                },
            })
            return
        }
        res.send({ id: user.id, username: user.username })
    } catch (e) {
        res.status(e.status || 500);
        res.json({
            error: {
                message: "An internal error has occurred",
            },
        })
        console.log(e);
    }
}

export { postRegister, postLogin }