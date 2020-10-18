import { decodeJWT, error } from '../helper'

const auth = (req, res, next) => {
    const [type, token] = req.headers.authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(401).send(error("unauthorized"))
    }

    let id = decodeJWT(token)

    if (id !== null || "") {
        return res.status(401).json(error("bearer decode failed"))
    }

    next()
}

export default auth