import { getNotes, getNote, createNote, updateNote, deleteNote } from './controllers/controllers.js';
import express from 'express';
import cors from 'cors';
const app = express();


const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/notes', async (req, res) => {
    try {
        const notes = await getNotes();
        res.send(notes);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



app.get('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await getNote(id);
        if (!note) {
            return res.status(404).send({ message: "Note Not Found!" });
        }
        res.send(note);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



app.post('/notes', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents || !req.body.created) {
            return res.status(400).send({ message: "All fileds are required" });
        }
        const { title, contents, created } = req.body;
        let result = await createNote(title, contents, created);
        res.status(201).send({ message: result });

    } catch (error) {
        console.log(note);
        res.status(500).send({ message: error.message });
    }
});



app.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await getNote(id);
        if (!note) {
            return res.status(404).send({ message: "Note Not Found!" });
        }
        const { title, contents, created } = { note, ...req.body };
        let result = await updateNote(id, title, contents, created);
        res.status(200).send(result);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.delete('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await getNote(id);
        if (!note) {
            return res.status(404).send({ message: "Note Not Found!" });
        }
        let result = await deleteNote(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.listen(port, () => {
    console.log(`server listen on port ${port}`);
});
