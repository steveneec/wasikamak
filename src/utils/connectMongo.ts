import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.HOST as string);

export default connectMongo;
