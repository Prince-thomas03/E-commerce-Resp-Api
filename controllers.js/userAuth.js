import userModel from "../models/userModels.js"
import cryptoJs from "crypto-js";
import AsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'


export const userRegister = async (req, res) => {
    console.log("this is from req.body from userregister", req.body);
    try {

        const { username, email, password } = req.body

        var hashPassword = cryptoJs.AES.encrypt(password, process.env.PASS_MSG).toString();
        let user = new userModel({
            username,
            email,
            password: hashPassword
        })

        let savedUser = await user.save()
        res.status(200).json({ message: "sucessfully registered", response: savedUser })


    } catch (err) {
        res.status(500)
        throw new Error(err)

    }
}


export const userLogin = async (req, res) => {
    try {
        console.log("this is from req.body from uselogin", req.body);


        //  const { username, password } = req.body
        const user = await userModel.findOne({ username: req.body.username })
        console.log("user from db", user);
        // !user && res.status(400).json({ message: '*** creditionals' })

        if (!user) {
            res.status(400).json({ message: '*** creditionals' })

        }


        const hashPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_MSG)

        let hashedPassword = hashPassword.toString(cryptoJs.enc.Utf8);

        hashedPassword !== req.body.password && res.status(401).json({ message: '@@@ creditionals' })

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_MSG, { expiresIn: '3d' });



        //to avoid sending password we just extracted the password from the user and only send the other details
        let { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken })



        res.status(500).json("wrong creditionals")
    } catch (error) {
        throw new Error(error)
    }

}










