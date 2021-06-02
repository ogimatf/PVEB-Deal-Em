const handler = require("./socketHandler");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const routes = require("./routes");
const cors = require("cors");
const db = require("./db");

db.createConnection();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/user", routes);

app.use((req, res, next) => {
  const error = new Error("Method not alowed");
  error.status = 405;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      msg: error.message,
    },
  });
});

io.on("connection", handler);

module.exports = http;
