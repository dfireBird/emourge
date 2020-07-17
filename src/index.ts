import Bot from "./bot";
import mongoose from "mongoose";
import "dotenv/config";

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;

mongoose
    .connect(`mongodb://${username}:${password}@db:27017/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ Connected to database");
        new Bot(process.env.BOT_TOKEN || "");
    })
    .catch((err) => console.log(err));
