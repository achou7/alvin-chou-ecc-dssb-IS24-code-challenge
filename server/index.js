import { createRequire } from "module";
import { seedData } from "./data/seed.js";
const require = createRequire(import.meta.url);

const cors = require('cors');
const express = require("express");
const crypto = require("crypto");
const validator = require("express-validator");


let data = seedData();


let app = express();
app.use(cors());
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/api/projects", (req,res) => {
    res.status(200).json(data['projects']);
});

app.get("/api/projects/:uuid", (req, res) => {
    const uuid = req.params.uuid;
    if(!data['projects'][uuid]) {
        res.status(404).json({message: 'Requested data not found'});
    } else {
        console.log(data['projects'][req.params.uuid]);
        res.status(200).json(data['projects'][req.params.uuid]);
    }
});

app.get("/api/developers", (req,res) => {
    res.status(200).json(data['developers']);
});

app.get("/api/developers/:uuid", (req,res) => {
    const uuid = req.params.uuid;
    if(!data['developers'][uuid]) {
        res.status(404).json({message: 'Requested data not found'});
    } else {
        console.log(data['developers'][req.params.uuid]);
        res.status(200).json(data['developers'][req.params.uuid]);
    } 
})

app.get("/api/all", (req, res) => {
    res.status(200).json(data);
});

app.post('/api/projects', (req, res, next) => {
    const {name, owner, scrum_master, developers, start_date, methodology, location} = req.body;
    
    if(!name || !owner || !scrum_master || !developers || !start_date || !methodology || !location) {
        res.status(400).json({message: 'Data not saved, missing required fields'});
    }
    
    let uuid = crypto.randomUUID();
    let dataToPush = {
        name: name,
        owner: owner,
        scrum_master: scrum_master,
        developers: developers,
        start_date: start_date,
        methodology: methodology,
        location: location
    };
    data[uuid] = dataToPush;
    res.status(201).json({message: 'Data successfully saved!'});  
});
