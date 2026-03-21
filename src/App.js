import React, { useEffect, useState } from "react";
import { getIssues,addIssues } from "./services/issueService";
import "./main.css"

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
   
    const data = await getIssues();
    setIssues(data);
  };

  const addIssueHandler = async (e) => {
     e.preventDefault();
     const payload = {
      title,
      description
     }
     const newIssue = await addIssues(payload);
     setIssues((prev) => [...prev,newIssue]);
 
  }
  return (
    <div className="app-container">
      <h1>Issue Tracker</h1>
      <form onSubmit={addIssueHandler}> 
          <div className="form-container"> 
           <input
            type="text" 
            name="title"
            value={title}
            placeholder="Enter the Title"
            onChange={(e)=> setTitle(e.target.value)}
          />
          <input 
              type="text" 
              name="description" 
              placeholder="Enter the Description"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
            />
          </div> 
       
        <button type="submit">Add Issue</button>
      </form>
      
      <hr />

      <h2>Issue List</h2>
      {issues?.map((issue) => (
        <div key={issue._id}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
          <p>Priority: {issue.priority}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;