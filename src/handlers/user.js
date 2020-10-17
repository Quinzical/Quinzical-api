import { comparePassword, hashPassword } from '../helper'
import { User } from '../models'

const postRegister = async (req, res) => {

    try {

        const { username, password } = req.body
        if (username == '') {
            res.json({
                error: {
                    message: "Username is empty",
                },
            })
            return
        }

        const user = new User({ username: username, password: await hashPassword(password) })
        const { id } = await user.save()

        res.send({ id: id })
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