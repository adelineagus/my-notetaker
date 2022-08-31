//import packages needed
const fs= require('fs');
const db= require('express').Router();
const { uuid }= require('uuidv4')

//get route which for retrieving notes
db.get('/', (req,res)=> {
    let data= JSON.parse(fs.readFileSync('./db/db.json', "utf8"));
    res.json(data);
});

//post route for logging notes
db.post('/', (req,res)=> {
    const notes=req.body;
    notes.id=uuid();
    let data= JSON.parse(fs.readFileSync('./db/db.json', "utf8"));
    data.push(notes);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    
    const response= {
        status: 'success',
        body: notes
    };
    res.json(response);

})

//delete route for particular --> delete notes with certain id
db.delete('/:id', (req, res) => {
    let notesID= req.params.id;
    let data= JSON.parse(fs.readFileSync('./db/db.json', "utf8"));

    let filteredData= data.filter(note => note.id !== notesID);
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredData));

    res.json(data);
})

module.exports=db;