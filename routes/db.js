const fs= require('fs');
const db= require('express').Router();
const { uuid }= require('uuidv4')

db.get('/', (req,res)=> {
    let data= JSON.parse(fs.readFileSync('./db/db.json', "utf8"));
    res.json(data);
});

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
db.delete('/:id', (req, res) => {
    let notesID= req.params.id;
    let data= JSON.parse(fs.readFileSync('./db/db.json', "utf8"));

    let filteredData= data.filter(note => note.id !== notesID);
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredData));

    res.json(data);
})

module.exports=db;