import * as dotenv from 'dotenv'
import connectDB from './src/db/connect.js'
import Product  from './src/models/products.js'
import jsonProducts from './products.js'

dotenv.config()


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()