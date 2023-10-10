import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'; 

function App() {
  const project_url = 'http://localhost:5000/api/projects';
  const dev_url = 'http://localhost:5000/api/developers';
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const methodology = {
    1: "Waterfall",
    2: "Agile"
  }
  async function fetchProjects()  {
    const res = await fetch(project_url);
    const data = await res.json();

    setProjects(data);
  }

  async function fetchDevelopers()  {
    const res = await fetch(dev_url);
    const data = await res.json();

    setDevelopers(data);
  }

  useEffect(() => {
    fetchProjects();
    fetchDevelopers();
  }, []);

  return (
    <div className="App">
    <h1 style={{ color: "green" }}>using JavaScript inbuilt FETCH API</h1>
    <div>
    <table>
      <thead>
        <tr><th>Id</th>
        <th>Name</th>
        <th>Owner</th>
        <th>Scrum Master</th>
        <th>Developers</th>
        <th>Start Date</th>
        <th>Methodology</th>
        <th>Location</th></tr>
        
      </thead>
      <tbody>

      {Object.keys(projects).map((p, index) => {
        
        return(
          <tr>
            <td>{projects[p].id}</td>
            <td>{projects[p].name}</td>
            <td>{developers[projects[p].scrum_master].name}</td>
            <td>{developers[projects[p].owner].name}</td>
            <td><ul>{projects[p].developers.forEach((dev) => {
              console.log(developers[dev]);
              
                <li>{developers[dev].name}</li>
              
            })}</ul></td>
            <td>{projects[p].startDate}</td>
            <td>{methodology[projects[p].methodology]}</td>
            <td>{projects[p].location}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
    </div>
  </div>
);
}

export default App;
