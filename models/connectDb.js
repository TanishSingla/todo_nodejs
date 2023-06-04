import mongoose from "mongoose";

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendapi"
    }).then(() => {
        console.log("DataBase Connected");
    }).catch((e) => {
        console.log(e);
    })
};
