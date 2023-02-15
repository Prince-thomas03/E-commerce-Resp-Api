import express, { urlencoded } from 'express'
import { dbConnection } from './config/db.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import authRouter from './routes/userAuth.js'
const app = express()

dotenv.config()
dbConnection()

app.use(express.json())
app.use(express.urlencoded())

app.use('/user', userRouter)
app.use('/auth',authRouter)



app.listen(process.env.PORT || 3000, () => console.log(`application listen to port ${process.env.PORT} `))