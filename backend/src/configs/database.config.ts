import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        const url = `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;
        const connect = await mongoose.connect(url);
        console.log(`MongoDB Connection: ${connect.connection.host}`);
        console.log(`Database Name: ${connect.connection.name}`);
    } catch (error:any) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
}

export default connectMongoDB;