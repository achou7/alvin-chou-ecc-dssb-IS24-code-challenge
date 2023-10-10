import {names} from "./data/fake-names.js";

const express = require("express");
const sqlite3 = require("sqlite3").verbose();

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
    db.run(`INSERT INTO developers(id, name, projects, scrum_mastering, owner_of) VALUES 
            (1, Alvin Chou, null, null, null),
            (2, Melvin Sturmstrong, null, null, null),
            (3, Alan A Stewart, null, null, null),
            (4, Mildred J. Tran, null, null, null),
            (5, Christopher E. Edmondson, null, null, null),
            (6, Melvin Sturmstrong, null, null, null),
            (7, Blaine J. Przybylski, null, null, null),
            (8, Melvin Sturmstrong, null, null, null),
            (9, Cole B. Cudney, null, null, null),
            (10, Melvin Sturmstrong, null, null, null),
            (11, Alvin Chou, null, null, null),
            (12, Melvin Sturmstrong, null, null, null),
            (13, Alvin Chou, null, null, null),
            (14, Melvin Sturmstrong, null, null, null),
            (15, Alvin Chou, null, null, null),
            (16, Melvin Sturmstrong, null, null, null),
            (17, Alvin Chou, null, null, null),
            (18, Melvin Sturmstrong, null, null, null),
            (19, Alvin Chou, null, null, null),
            (20, Melvin Sturmstrong, null, null, null),
            (21, Alvin Chou, null, null, null),
            (22, Melvin Sturmstrong, null, null, null),
            (23, Alvin Chou, null, null, null),
            (24, Melvin Sturmstrong, null, null, null),
    `)
});
let app = express();

app.listen(5000, () => {
    console.log("Server running on port 3000");
});

app.get("/api", (req,res,next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});