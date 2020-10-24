const users = new Map()

const addUser = (username, id) => {
    users.set(id, username)
    console.log(users)
}

const removeUser = (id) => {
    users.delete(id)
}

const getUsername = (id) => {
    return users.get(id)
}

const getSocket = (username) => {
    return Object.keys(users).find(key => users[key] === username);
}

const getAllUser = () => {
    return users
}

const parseUsers = () => {
    return Object.fromEntries(users);
}

export { addUser, removeUser, getUsername, getAllUser, getSocket, parseUsers }