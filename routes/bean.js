const express = require('express');
const router = express.Router();

const Bean = require('../models/Bean')

router.get("/", async (req, res) => {
  const beans = await Bean.find()
  try {
    if (beans.length === 0) {
      return res.status(400).json({message: "Didn't find any beans"});
    }
    return res.status(200).json(beans);
  } catch (error) {
    return res.status(500).json({message: "Sometthing went wrong with the server"})
  }
});

router.post("/bean", async (req, res) => {
  const beanToCreate = await Bean.create(req.body);
  try {
    return res.status(201).json(beanToCreate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create bean"});
  }
});

router.delete("/bean/:id", async (req, res) => {
  const { id } = req.params;
  const beanToDelete = await Bean.findByIdAndDelete(id);
  try {
    return res.status(203).json({message: "Succesfully Delete"});
  } catch (error) {
    return res.status(500).json({message: "Couldn't delete bean"})
  }
})

module.exports = router;