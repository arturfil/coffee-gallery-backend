const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { generateJwt } = require('../helpers/generateJwt');

router.post("/signup", async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({email});
  if (testEmail) {
    return res.status(500).json({message: "Coudn't signup, please try again"});
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the user"}); 
  }
});

router.post("/login", async (req, res) => {
  const { email, password} = req.body;
  const user = await User.findOne({email}).populate("favorites")
  if (!user) {
    return res.status(500).json({message: "Please check credentials"})
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({message: "Please check credentials"});
  }
  // const token = await generateJwt(user._id); TODO: add token to login frontend
  return res.status(200).json(user);
})

router.get("/favorites/:id", async (req, res) => {
  const { id } = req.params;
  const user = User.findById(id).populate("favorites");
  try {
    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({message: "Couldn't retrieve coffees"})
  }
});

router.post("/addFavorite/:id", async (req, res) => {
  // retrieve fav id's
  // push new id from req.body
  // save user with the new update
  
})

module.exports = router;
