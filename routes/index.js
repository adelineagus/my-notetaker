const express= require('express');

//import modular routers for /db = notes
const dbRouter= require('./db');

const app= express();

app.use('/notes', dbRouter);

module.exports=app;