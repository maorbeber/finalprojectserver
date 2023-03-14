const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
var cors = require("cors");

app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("connected to mongoose"))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log("server is running");
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
