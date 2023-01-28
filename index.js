import express from "express"
import * as dotenv from "dotenv"
import notFound from "./src/middlewares/not-found.js"
import errorHandler from "./src/middlewares/error-handler.js"
import connectDB from "./src/db/connect.js"
import productRoute from "./src/routes/products.js"
import 'express-async-errors'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Products</a>')
})

app.use('/api/v1/products', productRoute)

// Error handles should be the last middlewares

app.use(notFound)
app.use(errorHandler)

const port  = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('Server is listening on port:' + port)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
