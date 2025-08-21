import ctrlWrapper from "../helpers/ctrlWrapper.js";
import generateOpts from "../helpers/generateOpts.js";
import HttpError from "../helpers/HttpError.js";
import tmi from "tmi.js";

let client = null;
let intervalId = null;
const is_active = client !== null;

const startBot = ctrlWrapper(async (req, res) => {
  const { name, message, interval, token } = req.body;

  const opts = generateOpts(name, token);

  if (client) {
    throw HttpError(400, "Bot is already running.");
  }

  client = new tmi.Client(opts);

  const sendMessage = () => {
    client.say(opts.channels[0], message);
    console.log("Message was sent!");
  };

  try {
    await client.connect();
    console.log("Bot is connected.");

    sendMessage();
    intervalId = setInterval(sendMessage, interval * 60 * 1000);

    res.status(201).json({ message: "Bot started." });

    client.on("disconnected", () => {
      console.log("Bot disconnected.");
    });
  } catch (error) {
    client = null;
    throw HttpError(500, "Cannot connect to Twitch.");
  }

  res.status(201).json({
    message: "Bot started.",
    is_active: client !== null,
  });
});

const stopBot = ctrlWrapper(async (req, res) => {
  if (!client) {
    console.log("Bot not started.");
    throw HttpError(400, "Bot not started.");
  }

  clearInterval(intervalId);
  client.disconnect();
  client = null;
  intervalId = null;
  console.log("Bot stopped.");

  res.status(200).json({
    message: "Bot stopped.",
    is_active,
  });
});

const botStatus = ctrlWrapper(async (req, res) => {
  res.status(200).json({ is_active });
});

export default { start: startBot, stop: stopBot, status: botStatus };
