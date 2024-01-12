import { getNotes, getNote, createNote, updateNote, deleteNote} from './database/database.js';
import express from 'express';
import cors from 'cors';
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.get('/notes', async (req, res)=>{
    const notes = await getNotes();
    res.send(notes);
});

app.get('/notes/:id', async  (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    if(!note){
        res.status(404).send({message: "Note Not Found!"});
    }
    res.send(note);
});

app.post('/notes', async  (req, res) => {
    const {title, contents, created } = req.body;
    let result = await createNote(title, contents, created);
    res.status(201).send({message: result});
});

app.put('/notes/:id', async (req, res) =>{
    const id = req.params.id;
    const note = await getNote(id);
    if(!note){
        res.status(404).send({message: "Note Not Found!"});
    }
    const {title, contents, created } = req.body;
    const update = {
        title: title || note.title,
        contents: contents || note.contents,
        created: created || note.created
    }
    
    let result = await updateNote(id, update);
    res.status(200).send(result);
});

app.delete('/notes/:id', async(req, res)=>{
    const id = req.params.id;
    const note = await getNote(id);
    if(!note){
        res.status(404).send({message: "Note Not Found!"});
    }
    let result = await deleteNote(id);
    res.status(200).send({message: result});
});

app.listen(port, ()=>{
    console.log(`server listen on port ${port}`);
});