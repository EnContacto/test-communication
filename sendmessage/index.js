const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const messageRoutes = require("./routes/messageRoutes");
const morgan = require("morgan");
const winston = require("winston");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`sendmessage service running on port ${PORT}`);
});