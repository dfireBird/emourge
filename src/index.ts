import Bot from "./bot";
import { createConnection } from "typeorm";
import "reflect-metadata";
import "dotenv/config";

createConnection()
    .then(() => {
        console.log("✅ Connected to database");
        new Bot(process.env.BOT_TOKEN || "");
    })
    .catch((err) => console.log(err));
