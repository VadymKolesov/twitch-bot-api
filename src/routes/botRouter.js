import express from "express";
import bot from "../controllers/bot.js";
import validateBody from "../middlewares/validateBody.js";
import botSchemas from "../schemas/botSchemas.js";

const botRouter = express.Router();

botRouter.post("/start", validateBody(botSchemas.startBotSchema), bot.start);
botRouter.post("/stop", bot.stop);
botRouter.get("/status", bot.status);

export default botRouter;
