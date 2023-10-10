import {names} from "fake-names.js";

const sqlite3 = require("sqlite3").verbose();

export default function seedDatabase() {
  
    let db = new sqlite3.Database(':memory:', (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Connected to the in-memory SQlite database');
    });

    db.serialize(() => {
        db.run(`CREATE TABLE projects (
            id integer,
            name text,
            scrum_master integer,
            product_owner integer,
            developer_names text,
            start_date text,
            methodology text,
            location text
        )`);
        db.run(`CREATE TABLE developers (
            id integer,
            name text,
            projects text
            scrum_mastering text
            owner_of text
        )`);
        

      
        
    });

}
