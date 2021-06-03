const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//GET all users
router.get('/', async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//signup a user
router.post('/signin', async (req, res) => {
  const userExists = await Users.findOne({ email: req.body.email });
  if (userExists) {
    return res.send('This user already exists');
  }

  const hashpassword = await bcrypt.hash(req.body.password, 12);

  const user = new Users({
    password: hashpassword,
    email: req.body.email,
  });
  try {
    const signupUser = await user.save();
    res.json(signupUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/login', async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.send({ isLogged: false });
  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.send({ isLogged: false });
  //create a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  
  res
    .header('auth-token', token)
    .send({ isLogged: true, email: user.email, token });
});

//get One User
router.get('/:userId', async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
