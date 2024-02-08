import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1/usermanagement')
    console.log(`mongodb connected on ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
    
}
export default connectDb