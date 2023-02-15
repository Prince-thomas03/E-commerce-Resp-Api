import express from 'express'
const router = express.Router()
import { updateUser,deleteUser,getUser,getAllUser } from '../controllers.js/user.js'
import {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../routes/verifyToken.js'

router.put('/update/:id',verifyTokenAndAuthorization, updateUser)
router.delete('/delete/:id',verifyTokenAndAuthorization,deleteUser)
router.get('/find/:id',verifyTokenAndAdmin,getUser)
router.get('/findAllUser',verifyTokenAndAdmin,getAllUser)


export default router