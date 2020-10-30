import { Image } from '../models'
import { error } from '../helper';

const getImage = async (req, res) => {
    try {
        const image = await Image.findOne({ user_id: req.auth }).exec();
        console.log(image)
        console.log(req.auth)
        res.json(image)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const getImages = async (req, res) => {
    try {
        let image = await Image.find({})
        res.json(image)
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

const postImage = async (req, res) => {
    try {
        const { imageUri } = req.body

        if (imageUri == '' || imageUri === undefined) {
            res.status(401);
            res.json(error("image uri is empty"))
            return
        }

        let query = { user_id: req.auth },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Image.findOneAndUpdate(query, { imageUri: imageUri }, options,
            (err, result) => {
                if (err) {
                    console.log(err)
                }
            })

        /*const image = new Image({
            user_id: req.auth,
            imageUri: image_uri,
        })

        const { id } = await image.save()
        */
        res.json({ message: "sucessful" })
    } catch (e) {
        res.status(e.status || 500);
        res.json(error("an internal error has occurred"))
        console.log(e);
    }
}

export { getImages, getImage, postImage }