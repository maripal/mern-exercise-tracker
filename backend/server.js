const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//our database uri we get from the mongodb atlas dashboard. Where our db is stored.
const uri = process.env.ATLAS_URI;
//connect our db. 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//With this, when someone goes the route url & adds /exercise, it'll load everything inside the exercisesRouter.
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));