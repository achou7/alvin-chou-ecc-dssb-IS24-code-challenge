import {developer_names} from "./fake-names.js";
import {project_names} from "./fake-names.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const crypto = require("crypto");



export function seedData() {
    let data = {
        developers: {},
        projects: {}
    }
    developer_names.forEach((developer) => {
       let uuid = crypto.randomUUID();
       data["developers"][uuid] = {
           name: developer,
           projects: [],
           scrum_master_of: [],
           owner_of: [],
       }
    });
    let devIds = Object.keys(data['developers']);
    
    const repos = async () => {
        
        const response = await fetch(`https://api.github.com/users/bcgov/repos?per_page=${project_names.length}`);
        const json = await response.json();
        console.log(json[0]);
        project_names.forEach((project, index) => {
            let uuid = crypto.randomUUID();
            let maxDevs = Math.floor(Math.random() * 5) + 1;
            let scrum_master_uuid = devIds[Math.floor(Math.random() * devIds.length)];
            let owner_uuid = devIds[Math.floor(Math.random() * devIds.length)];
            let d = randomDate(new Date(2012, 0, 1), new Date());
            
            data['developers'][scrum_master_uuid].scrum_master_of.push(uuid);
            data['developers'][owner_uuid].owner_of.push(uuid);
      
            let project_developers = [];
            while(project_developers.length < maxDevs) {
                let devUUID = devIds[Math.floor(Math.random() * devIds.length)];
                if(project_developers.indexOf(devUUID) !== -1) {
                    continue;
                } else {
                  let developer = data['developers'][devUUID];
                  if(developer.projects.indexOf(uuid) === -1) {
                      developer.projects.push(uuid);
                  }
                  project_developers.push(devUUID);
                }
            }
            data['projects'][uuid] = {
                name: project,
                scrum_master: devIds[Math.floor(Math.random() * devIds.length)],
                owner: devIds[Math.floor(Math.random() * devIds.length)],
                developers: project_developers,
                startDate: d.toLocaleString("default", {year:"numeric"}) + "/" + d.toLocaleString("default", {month: "2-digit"}) + "/" + d.toLocaleString("default", {day: "2-digit"}),
                methodology: Math.floor(Math.random() * 2) + 1,
                location: json[index]["html_url"]
            }
            console.log(data);
            
         });
         
    }

    repos();
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    
   return data;
}

