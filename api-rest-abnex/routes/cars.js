const express = require('express');
const router = express.Router();
const multer = require('multer');
const Cars = require('../models/Cars');
const Comment = require('../models/Comments');


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

router.get('/:carsId/comments', async(req, res)=>{
  try {
    const foundCar = await Cars.find({_id: req.params.carsId}).populate("postComments");
    res.json(foundCar);
  } catch (error) {
    res.json({ message: err})
    
  }
});


router.get('/comments', async(req, res)=>{
  try {
    const foundCars = await Comment.find();
    res.json(foundCars);
  } catch (error) {
    res.json({ message: err})
    
  }
});


router.post('/:carsId/comments', async(req, res)=>{
  const comment = new Comment({
    email: req.body.email,
    comments: req.body.comments,
    cars: req.params.carsId
  });
  try {
    await comment.save()
    .then(result =>{
       Cars.findById((result.cars), (err, car)=>{
        if(car){
          car.postComments.push(comment);
          car.save();
          res.json({message: 'Commentaire crée'})
        }
      })
      
    })    
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;
