import logo from './logo.svg';
import './App.css';
import './DataTables.css';

import React, { useState, useEffect } from 'react'; 
import DataTable from './Components/DataTable.js';
function App() {
  // const project_url = 'http://localhost:5000/api/projects';
  // const dev_url = 'http://localhost:5000/api/developers';
 
 
 

  // async function fetchDevelopers()  {
  //   const res = await fetch(dev_url);
  //   const data = await res.json();

  //   setDevelopers(data);
  // }

  

  return (
    <div className="App">
      <DataTable />
    </div>
  
)}
  

export default App;
