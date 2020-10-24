import { decodeJWT, error } from '../helper'

const auth = (req, res, next) => {
    console.log(req.headers.authorization)
    try {
        const [type, token] = req.headers.authorization.split(' ')

        if (type.toLowerCase() !== 'bearer') {
            console.log(token)
            return res.status(401).send(error("unauthorized"))
        }
        console.log(token)
        let id = decodeJWT(token)
        console.log(id)

        if (id == null || id == "") {
            return res.status(401).json(error("bearer decode failed"))
        }

        req.auth = id
    } catch (e) {
        return res.status(401).send(error("unauthorized"))
    }


    next()
}

const authSocket = (socket, next) => {
    try {
        const header = socket.handshake.headers['authorization']
        console.log(header)

        if (type.toLowerCase() !== 'bearer') {
            return next(new Error('unauthorized'))
        }
        let id = decodeJWT(token)

        if (id == null || id == "") {
            return next(new Error('unauthorized'))
        }

        req.auth = id
    } catch (e) {
        return next(new Error('unauthorized'))
    }
}

export {auth, authSocket}