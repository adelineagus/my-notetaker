//import packages needed
const express =require('express');
const path= require('path');
const api= require('./routes/index.js');

//setting up PORT
const PORT=process.env.PORT||3001;
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', api);

app.use(express.static('public'));

//when /notes is called, file notes.html from public folder will be sent/displayed
app.get('/notes', (req,res)=>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//
app.get('*',(req,res)=>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


