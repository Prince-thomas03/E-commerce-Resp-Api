import express from 'express'
const router = express.Router()
import { userRegister,userLogin } from '../controllers.js/userAuth.js'

//REGISTER
router.post('/register',userRegister)
//LOGIN
router.post ('/login',userLogin)




export default router