import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
       const connection =  mongoose.connection
       connection.on("connected", () => console.log("Mongo DB connected"));
       connection.on("error", (err) => {
        console.log("Mongo DB connection error ", err)
        process.exit()
    });
    } catch (error) {
        console.log("something went wrong whiel connecting to DB");
    }
}