import React, { useState } from 'react';

function FormModal(props) {
  let titleRef = React.useRef();
  let scrumMasterRef = React.useRef();
  let ownerRef = React.useRef();
  let devOneRef = React.useRef();
  let devTwoRef = React.useRef();
  let devThreeRef = React.useRef();
  let devFourRef = React.useRef();
  let devFiveRef = React.useRef();
  let methodologyRef = React.useRef();
  let locationRef = React.useRef();


  const handlePost = (e) => {
    e.preventDefault();
    

    let formData = {
        name: titleRef.value,
        scrum_master: scrumMasterRef.value,
        owner: ownerRef.value,
        developers: [devOneRef.value, devTwoRef.value, devThreeRef.value, devFourRef.value, devFiveRef.value],
        methodology: methodologyRef.value,
        location: locationRef.value
    }
    console.log(JSON.stringify(formData));
    // Make a POST request to your API using fetch or a library like axios.
    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., close the modal and reset the form.
          console.log(response);
        } else {
          // Handle error, e.g., display an error message.
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle network or other errors.
        console.log(error);
      });
  };

  return (
    <div className={props.open ? "modalOpen" : "modalClose"}>
    
    <div className="modal">
        <div className="modal-content">
            { props.requestType === "post" ? (
            <div>
            <h2>Create a new project</h2>
            <form onSubmit={handlePost}>
            <div className="form-group">
                <label>Project Name:</label>
                <input
                    type="text"
                    name="title"
                    ref={titleRef}
                    required
                />
            </div>
            <div className="form-group">
                <label>Scrum Master:</label>
                <select name="scrum_master" ref={scrumMasterRef} required>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Owner:</label>
                <select name="owner" ref={ownerRef} required>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Developer 1:</label>
                <select name="dev1" ref={devOneRef} required>
                    <option value="blank"> --- </option>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
                <label>Developer 2:</label>
                <select name="dev2" ref={devTwoRef}>
                <option value="blank"> --- </option>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
                <label>Developer 3:</label>
                <select name="dev3" ref={devThreeRef}>
                <option value="blank"> --- </option>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
                <label>Developer 4:</label>
                <select name="dev4" ref={devFourRef}>
                <option value="blank"> --- </option>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
                <label>Developer 5:</label>
                <select name="dev5" ref={devFiveRef}>
                <option value="blank"> --- </option>
                    {props.developers.map((dev) => {
                       return (<option value={dev.name} key={dev.id}>{dev.name}</option>)
                    })}
                </select>
            </div>
            <div className="form-group">
                <label>Methodology:</label>
                <select name="methodology" ref={methodologyRef} required>
                    <option value="agile">Agile</option>
                    <option value="waterfall">Waterfall</option>
                </select>
            </div>
            <div className="form-group">
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    ref={locationRef}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            </form>
            <button onClick={props.onClose}>Close</button>
            </div>
            ) : (
                <div></div>
            )}
        </div>
        </div>
        
    </div>
  );
}

export default FormModal;