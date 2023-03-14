const router = require("express").Router();
const Order = require("../models/Order");


router.get("/create", async (req, res) => {
    // try {
      
    //   const id = req.params.id;
    //   product = await Product.findOne({ _id: id });
    //   res.status(200).json(product);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  });

module.exports = router;
