const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
require('dotenv/config');

const carsRoute = require('./routes/cars');
const userRoute = require('./routes/user');
//Middlewares
app.use(cors());
app.use(express.json());
app.use('/cars', carsRoute);
app.use('/user', userRoute);
//ROUTES
app.get('/', (req, res) => {
  res.send('We are on Home');
});
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },() => 
  console.log(' Database connection is successful!')
);

//CONNECT DATABASE
app.listen(3001);
