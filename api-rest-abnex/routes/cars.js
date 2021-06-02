const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const Cars = require('../models/Cars');


//GET THE carsS
router.get('/', async (req, res) => {
  try {
    const cars = await Cars.find();
    res.json(cars);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A POTS

// "marque": "My first posts modified",
//     "couleur": "Rouge",
//     "description" : "ceci est une petite description "

router.post('/', async (req, res) => {
  const cars = new Cars({
    mark: req.body.mark,
    type: req.body.type,
    color: req.body.color,
    description: req.body.description
  });
  try {
    const savedcars = await cars.save();
    res.json(savedcars);
  } catch (err) {
    res.json({ message: err });
  }
});
// SPECIFIC cars
router.get('/:carsId', async (req, res) => {
  try {
    const cars = await Cars.findById(req.params.carsId);
    res.json(cars);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE cars
router.delete('/:carsId', async (req, res) => {
  try {
    const remove = await Cars.remove({ _id: req.params.carsId });
    res.json(remove);
  } catch (error) {
    res.json({ message: err });
  }
});

//UPDATE cars
router.patch('/:carsId', async(req, res) => {
  try {
    const updateOne = await Cars.updateOne(
      { _id: req.params.carsId },
      {
        $set: { title: req.body.title },
      }
    );
    res.json(updateOne);
  } catch (error) {
    res.json({ message: err });
  }
});

module.exports = router;
