const getHome = async (req, res) => {
    res.send("Welcome to Quinzical API")
}

const unimplemented = async (req, res) => {
    res.status(404);
    res.send("Unimplemented")
}

export { getHome, unimplemented }