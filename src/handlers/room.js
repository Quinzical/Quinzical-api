const { getRooms } = require("../socket/room")

const getAllRooms = async (req, res) => {
    res.json(getRooms())
}

export { getAllRooms }