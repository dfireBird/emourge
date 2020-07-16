import Bot from "./bot";
import "dotenv/config";

new Bot(process.env.BOT_TOKEN || "");
