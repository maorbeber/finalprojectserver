const router = require("express").Router();
const User = require("../models/User");
const apiKey = "AIzaSyD3vyq_fuWDbZWawZWVrstcc5Zwx0khNKY"; // Replace with your Firebase API key
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

//register

const fetch = require("node-fetch");

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  //parsing and register to firebase
  const options = {
    method: "POST",
    body: JSON.stringify({
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true,
    }),
    headers: { "Content-Type": "application/json" },
  };
  fetch(registerUrl, options)
    .then((response) => response.json())
    .then(async (data) => {
      //register the user into firebase
      console.log("here");
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
      });
      try {
        console.log("here2");
        const savedUser = await newUser.save();
        console.log("here3");
        res.json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error signing up user");
    });
});

router.post("/login", async (req, res) => {
  //parsing and login to firebase
  const user = await User.findOne({ username: req.body.username });
  const options = {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: req.body.password,
      returnSecureToken: true,
    }),
    headers: { "Content-Type": "application/json" },
  };
  fetch(loginUrl, options)
    .then((response) => response.json())
    .then(async (data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/setAdmin/:email", async (req, res) => {
  //parsing and login to firebase
  const filter = { email: req.params.email };
  const update = {
    isAdmin: true,
  };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log(updatedUser);
  res.status(200);
});

router.get("/user/:email", async (req, res) => {
  //parsing and login to firebase
  const filter = { email: req.params.email };
  const user = await User.findOne(filter);
  console.log(user.isAdmin);
  res.send(user.isAdmin);
});

router.get("/update/:username/:state", async (req, res) => {
  //parsing and login to firebase
  const filter = { username: req.params.username };
  const state = req.params.state;
  const user = await User.findOneAndUpdate(
    filter,
    {
      $set: {
        isAdmin: state,
      },
    },
    { new: true }
  );
  res.send(user);
});

//39.25

module.exports = router;
