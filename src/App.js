import React, { useEffect, useState } from "react";
import { getIssues,addIssue,editIssue } from "./services/issueService";
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
     const newIssue = await addIssue(payload);
     setIssues((prev) => [...prev,newIssue]);
 
  }
  const handleIssueEdit = async (id) => {
    const editObj = issues.find(obj => id == obj._id);
    // console.log("the edit obj",editObj);
   setTitle(editObj.title || "");
   setDescription(editObj.description || "");
    // console.log("id",id)
    // const res = await editIssue (id);
    //  console.log("res",res)
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
            <select>
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>
            <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
          </div> 
       
        <button type="submit">Add Issue</button>
      </form>
      
      <hr />

      <h2>Issue List</h2>
      {issues?.map((issue) => (
        <div key={issue._id} className="issue-container">
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
          <p>Priority: {issue.priority}</p>
          <button onClick={() => handleIssueEdit(issue._id)}>Edit</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;