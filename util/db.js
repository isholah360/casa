const mongoose = require ("mongoose");

const casaDb = async () => {
    try {
    
        const konect = await mongoose.connect(process.env.MONGO_URI)
        // const konect = await mongoose.connect("mongodb://127.0.0.1:27017/caza")
        console.log(`caza app Server is connecetd to ${konect.connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = casaDb;