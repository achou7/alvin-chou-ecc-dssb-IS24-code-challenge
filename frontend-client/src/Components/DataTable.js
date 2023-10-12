import React, { useState, useEffect } from 'react';
import FormModal from './FormModal.js'; 

const DataTable = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [renderData, setRenderData] = useState([]);
    const [formRequest, setFormRequest] = useState("post");
    const [modalOpen, setModalOpen] = useState(true);
    const [filterColumn, setFilterColumn] = useState('owner');

    const url = 'http://localhost:5000/api/all';
    
    const fetchData = async () => {
        setLoading(true);
        let data;
        
        try {
            const res = await fetch(url);
            data = await res.json();
        } catch(error) {
            console.log('There was an error fetching: ' + error.message);
            setLoading(false);
        }
            
        if(data) {
            if(data['projects']) {
                setProjects(data['projects']);
                setRenderData(data['projects']);
            } else {
                setProjects([]);
                setRenderData([]);
            }
            if(data['developers']) {
                setDevelopers(data['developers'])
            } else {
                setDevelopers([]);
            }
            console.log(data['projects']);
            setLoading(false);
        }  
    }

    const selectFilter = (e) => {

        
        const column = e.target.value;
        const searchbar = document.getElementById('search-bar');       
        setFilterColumn(column);

        
        
    }

    const filterData = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredResults = projects.filter((item) => {
            switch(filterColumn) {
                case "owner":
                    return(item.owner.toLowerCase().includes(searchTerm));
                    break;
                case "scrum_master":
                    return(item.scrum_master.toLowerCase().includes(searchTerm));
                    break;
                case "developer":
                    return(item.developers.find(x => x.toLowerCase().includes(searchTerm)));
                    break;
                default:
                    return(projects);
                    break;
            }
        });

        setRenderData(filteredResults);
        setSearchTerm(searchTerm);

    }

    useEffect(() => {
        fetchData();
    }, []);
    
    
    return (
    <div className="data-table-div">
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div>
            <div className="search-options">
             <input
              id="search-bar"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={filterData}
             />
      
      <select onChange={selectFilter}>
        <option value="owner">Owner</option>
        <option value="scrum_master">Scrum Master</option>
        <option value="developer">Developer</option>
      </select>
      </div>
        
        
      <table className="data-table">
        <thead>
        <tr className="table-heads"><th>Product Number</th>
        <th>Name</th>
        <th>Owner</th>
        <th>Scrum Master</th>
        <th>Developers</th>
        <th>Start Date</th>
        <th>Methodology</th>
        <th>Location</th></tr>        
        </thead>
          
          <tbody>
          
          {renderData.map((p, index) => {
            
            return(
              <tr>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.owner}</td>
                <td>{p.scrum_master}</td>
                <td><ul>{p.developers.map((developer, index) => {
                  return  (
                      <li key={index}>{developer}</li>
                    )  
                })}</ul></td>
                <td>{p.startDate}</td>
                <td>{p.methodology}</td>
                <td>{p.location}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <p>{renderData.length} projects</p>
        </div>
        
  )}
  <FormModal open={modalOpen} projects={projects} developers={developers} settingData={setProjects} settingLoading={setLoading} requestType={formRequest}  />
  </div>
  
    )
}

export default DataTable;