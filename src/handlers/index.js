import { getLeaderboard, postLeaderboard, getHighScore } from './leaderboard'
import { getImage, postImage, getImages } from './image'
import { postLogin, postRegister, getSelf } from './user'
import { getHome, unimplemented } from './home'
import { getAllRooms } from './room'

export {
    getLeaderboard, postLeaderboard,
    getHome, unimplemented,
    postLogin, postRegister, getSelf,
    getHighScore,
    getAllRooms,
    postImage, getImage, getImages
}