import {developer_names} from "./fake-names.js";
import {project_names} from "./fake-names.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const crypto = require("crypto");



export function seedData() {
    let data = {
        developers: [],
        projects: []
    }
    let devIds = [];
    developer_names.forEach((developer) => {
       let uuid = crypto.randomUUID();
       devIds.push(uuid);
       data["developers"].push({
           id: uuid,
           name: developer,
           projects: [],
           scrum_master_of: [],
           owner_of: [],
       })
    });

    
    const repos = async () => {
        
        const response = await fetch(`https://api.github.com/users/bcgov/repos?per_page=${project_names.length}`);
        const json = await response.json();
        const methodology = ['Agile', 'Waterfall'];
        project_names.forEach((project, index) => {
            let uuid = crypto.randomUUID();
            let maxDevs = Math.floor(Math.random() * 5) + 1;
            let scrum_master = data['developers'][Math.floor(Math.random() * data['developers'].length)];
            let owner = data['developers'][Math.floor(Math.random() * data['developers'].length)];
            let d = randomDate(new Date(2012, 0, 1), new Date());
            
            scrum_master.scrum_master_of.push(uuid);
            owner.owner_of.push(uuid);
      
            let project_developers = [];
            while(project_developers.length < maxDevs) {
                let dev = data['developers'][Math.floor(Math.random() * data['developers'].length)];
                if(project_developers.indexOf(dev.name) !== -1) {
                    continue;
                } else {
                  if(dev.projects.indexOf(uuid) === -1) {
                      dev.projects.push(uuid);
                  }
                  project_developers.push(dev.name);
                }
            }
            data['projects'].push({
                id: uuid,
                name: project,
                scrum_master: data['developers'][Math.floor(Math.random() * data['developers'].length)].name,
                owner: data['developers'][Math.floor(Math.random() * data['developers'].length)].name,
                developers: project_developers,
                startDate: d.toLocaleString("default", {year:"numeric"}) + "/" + d.toLocaleString("default", {month: "2-digit"}) + "/" + d.toLocaleString("default", {day: "2-digit"}),
                methodology: methodology[Math.round(Math.random())],
                location: json[index]["html_url"]
            });
            console.log(data);
            
         });
         
    }

    repos();
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
   return data;
}

