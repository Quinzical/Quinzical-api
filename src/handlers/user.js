import { comparePassword } from '../helper'
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
        
        const user = new User({username: username, password: comparePassword(password)})
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