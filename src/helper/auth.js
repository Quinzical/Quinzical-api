const bcrypt = require('bcrypt');

const hashPassword = async (password) => await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash)
        return hash
    });
})

const comparePassword = (hashed, password) => {
    bcrypt.compare(password, hashed, (err, res) => {
        return res
    });
}

export { hashPassword, comparePassword }