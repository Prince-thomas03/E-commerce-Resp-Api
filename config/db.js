import mongoose from "mongoose";

 export const dbConnection=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true,
            useUnifiedTopology: true})
            console.log(`Database got connected`);
    } catch (e) {
        console.log(e.message);
    }
}

