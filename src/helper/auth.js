import { hash, compare } from 'bcrypt'

const hashPassword = async (password) => await new Promise((resolve, reject) => {
    hash(password, 10, (err, hashed) => {
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

export { hashPassword, comparePassword }