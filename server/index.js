import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import router from './router/index.js'
import errorMiddleware from "./middlewares/error-middleware.js";
import bodyParser from "body-parser";

dotenv.config()
const PORT = process.env.PORT || 7000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on PORT: ${process.env.API_URL}`))
    } catch (e) {
        console.log(e)
    }
}

start()