const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
const http = require("http");
const socketIO = require("socket.io");
var cors = require("cors");

app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("connected to mongoose"))
  .catch((err) => console.log(err));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let connectedUsers = 0;

io.on("connection", (socket) => {
  connectedUsers++;
  console.log(`server is running for ${connectedUsers} users`);

  // Emit the number of connected users to the client
  io.emit("connectedUsers", { count: connectedUsers });

  socket.on("disconnect", () => {
    connectedUsers--;
    console.log(`server is running for ${connectedUsers} users`);

    // Emit the number of connected users to the client
    io.emit("connectedUsers", { count: connectedUsers });
  });
});

server.listen(3001, () => {
  console.log("server is running");
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
