const router = require("express").Router();
const Product = require("../models/Product");

router.get("/find/:id", async (req, res) => {
  try {
    let product;
    const id = req.params.id;
    product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  //parsing and register to firebase
  const newProduct = new Product({
    title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
    category: [],
    size: req.body.size,
    price: req.body.price,
    color: req.body.color,
  });
  const savedProduct = await newProduct.save();
  res.json(savedProduct);
});

router.post("/update", async (req, res) => {
  id = req.body.id;
  title = req.body.title;
  desc = req.body.desc;
  image = req.body.image;
  category = [];
  size = req.body.size;
  price = req.body.price;
  color = req.body.color;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        desc: desc,
        image: image,
        size: size,
        color: color,
        price: price,
      },
    },
    { new: true }
  );
  const savedProduct = await product.save();
  res.json(savedProduct);
});

router.get("/delete/:id", async (req, res) => {
  try {
    let product;
    const id = req.params.id;
    product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/filters", async (req, res) => {
  try {
    let products;
    const color = req.query.color;
    const size = req.query.size;
    const sort = req.query.sort;
    const conditions = [];
    const sorted = [];
    sorted.push(
      sort == "newest"
        ? { createdAt: -1 }
        : sort == "asc"
        ? { price: -1 }
        : { price: 1 }
    );
    if (size) {
      conditions.push({ size: size });
    }
    if (color) {
      conditions.push({ color: color });
    }
    products = await Product.find({ $and: conditions }).sort(...sorted);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get("/", async (req, res) => {
  try {
    let products;
    if (req.query.id) {
      products = await Product.find({ id: req.query.id });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
