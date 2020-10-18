import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10

const createJWT = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
    )
}

const decodeJWT = (token) => {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    return id
}

const hashPassword = async (password) => await new Promise((resolve, reject) => {
    hash(password, saltRounds, (err, hashed) => {
        if (err) reject(err)
        resolve(hashed)
    });
})

const comparePassword = async (password, hashed) => await new Promise((resolve, reject) => {
    compare(password, hashed, (err, res) => {
        if (err) reject(err)
        resolve(res)
    })
})

export { hashPassword, comparePassword, createJWT, decodeJWT }