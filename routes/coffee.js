const express = require('express');
const router = express.Router();

const Coffee = require('../models/Coffee');

router.get("/", async (req, res) => {
  const coffees = await Coffee.find().populate("bean")
  try {
    if (coffees.length === 0) {
      return res.status(400).json({message: "Coffees not found"})
    }
    return res.status(200).json(coffees);
  } catch (error) {
    return res.status(500).json({message: "Couldn't retrieve coffees"})
  }
});

router.get("/coffee/:id", async (req, res) => {
  const { id } = req.params;
  const coffee = await Coffee.findById(id);
  try {
    return res.status(200).json(coffee);
  } catch (error) {
    return res.status(500).json({message: "Couldn't get the coffee"});
  }
});

router.post("/coffee", async (req, res) => {
  const coffeeToCreate = await Coffee.create(req.body);
  try {
    return res.status(201).json(coffeeToCreate);
  } catch (error) {
    return res.status(500).json({messasge: "Couldn't create the coffee"});
  }
});

router.put("/coffee/:id", async (req, res) => {
  const { id } = req.params;
  const coffeeToUpdate = await Coffee.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(coffeeToUpdate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't update the coffee"});
  }
});

router.delete("/coffee/:id", async (req, res) => {
  const { id } = req.params;
  await Coffee.findByIdAndDelete(id);
  try {
    return res.status(203).json({message: "Deleted sucessfully"});
  } catch (error) {
    return res.status(500).json({message: "Couldn't delete the coffee"})
  }
})

module.exports = router;