import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export async function getNotes() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM notes');
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

export async function getNote(id) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM notes WHERE id = @id');
        return result.recordset[0];
    } catch (error) {
        console.log(error);
    }

}


export async function createNote(note) {
    try {
        let pool = await sql.connect(config);

        let result = await pool.request()
            .input('title', sql.VarChar, note.title)
            .input('contents', sql.Text, note.contents)
            .input('created', sql.Date, note.created)
            .query('INSERT INTO notes (title, contents, created) VALUES (@title, @contents, @created)');
        return `Note ${note.title} Created!`;
    } catch (error) {
        console.log(error);
    }
}


export async function updateNote(id, note) {
    try {
        let pool = await sql.connect(config);

        let result = await pool.request()
            .input('id', sql.Int, id)
            .input('title', sql.VarChar, note.title)
            .input('contents', sql.Text, note.contents)
            .input('created', sql.Date, note.created)
            .query('UPDATE notes SET title = @title, contents =  @contents, created = @created WHERE id = @id');
        return getNote(id);
    } catch (error) {
       console.log(error);
    }
}



export async function deleteNote(id) {
    try {
        let pool = await sql.connect(config);

        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM notes WHERE id = @id');
        return `Note Deleted`;
    } catch (error) {
        console.log(error);
    }

}

