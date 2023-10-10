import { createRequire } from "module";
import { seedData } from "./data/seed.js";
const require = createRequire(import.meta.url);

const cors = require('cors');
const express = require("express");

let data = seedData();


let app = express();
app.use(cors());
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/api/projects", (req,res,next) => {
    res.json(data['projects']);
    next();
});

app.get("/api/projects/:uuid", (req, res, next) => {
    console.log(data['projects'][req.params.uuid]);
    res.json(data['projects'][req.params.uuid]);
    next();
});

app.get("/api/developers", (req,res,next) => {
    res.json(data['developers']);
});