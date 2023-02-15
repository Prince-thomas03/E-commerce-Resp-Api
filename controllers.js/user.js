import userModel from "../models/userModels.js"
import cryptoJs from "crypto-js";


//UPDATE USER
export const updateUser = async (req, res) => {
    console.log("hi iam updating user");
    try {
        if (req.body.password) {

            req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.PASS_MSG).toString();
        }

        const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        console.log("updated user", updateUser);
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }

}


//DELETE USER
export const deleteUser = async (req, res) => {
    console.log("iam from delete user");
    try {
        let userId = req.params.id
        const deletedUser = await userModel.findByIdAndDelete(userId)
        res.status(200).json({ message: 'user deleted', user: deleteUser })
    } catch (error) {
        res.status(500).json(error)
    }

}

//GET SPECIFIC USER
export const getUser = async (req, res) => {
    console.log("iam from getUser");
    try {
        let userid = req.params.id
        const user = await userModel.findById(userid)
        let { password, ...others } = user._doc;

        res.status(200).json({ message: "user found", user: others })
    } catch (error) {
        res.status(500).json('no user found')
    }
}

//GET ALL USER

export const getAllUser = async (req, res) => {
    console.log("get all users");
    const query = req.query.new
    try {

        const allUser = query ? await userModel.find().sort({ _id: -1 }).limit(5) : await userModel.find()
        res.status(200).json(allUser)

    } catch (error) {
        res.status(500).json("something went wrong not found user")
    }
}