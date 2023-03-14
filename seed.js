const mongoose = require("mongoose");
const Product = require("./models/Product"); // replace with your own model
const Cart = require("./models/Cart"); // replace with your own model
const Order = require("./models/Order"); // replace with your own model
const User = require("./models/User"); // replace with your own model

const products = [
  {
    title: "Shirto",
    desc: "Guitarl T-shirt",
    image:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    category: ["Men's wear"],
    size: "L",
    price: 200,
    color:"red",
  },
  {
    title: "Shirti",
    desc: "Guitar T-shirt",
    image:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    category: ["Men's wear"],
    size: "L",
    price: 200,
    color:"green",
  },
  {
    title: "Shirty",
    desc: "Guitary T-shirt",
    image:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    category: ["Men's wear"],
    size: "L",
    price: 200,
    color:"yellow",
  },
  {
    title: "Prade shirt",
    desc: "Pradac T-shirt",
    image:
      "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
    category: ["Men's wear"],
    size: "L",
    price: 500,
    color:"blue",
  },
  {
    title: "Jacket",
    desc: "Women's Jacket",
    image:
      "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    category: ["Women's wear"],
    size: "S",
    price: 700,
    color:"red",
  },
];

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("connected to mongoose2"))
  .catch((err) => console.log(err));

Product.create(products)
  .then(() => {
    console.log("seeding products succeeded");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
