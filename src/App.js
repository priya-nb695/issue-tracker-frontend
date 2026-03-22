import React, { useEffect, useState, useRef} from "react";
import { getIssues,addIssue,editIssue,deleteIssue } from "./services/issueService";
import "./main.css"

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Low");
  const [isEdit , setIsEdit] = useState(false);
  const [editId , setEditId] = useState("");
  const formSection = useRef(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
   
    const data = await getIssues();
    setIssues(data);
  };

  const addIssueHandler = async (e) => {
     setEditId("");
     e.preventDefault();
     const payload = {
      title,
      description,
      status,
      priority
     }
     const newIssue = await addIssue(payload);
     setIssues((prev) => [...prev,newIssue]);
 
  }
  const editIssueHandler = async (e) => {
     e.preventDefault();

     const editedIssue = await editIssue(editId);
     setIssues((prev) => prev.map((el) =>
     {
      return el._id == editId ? editedIssue : el 
     }
    ));
 
  }
  const handleIssueEdit = async (id) => {

   const editObj = issues.find(obj => id == obj._id);
   formSection.current.scrollIntoView({ behavior: "smooth" });
   setEditId(editObj._id);
   setIsEdit(true);
   setTitle(editObj.title || "");
   setDescription(editObj.description || "");
   setStatus(editObj.status);
   setPriority(editObj.priority);
  
  }
  const handleIssueDelete = async (id) => {

    const deletedIssue = await deleteIssue(id);
    setIssues((prev) => prev.filter((el) => el._id !== id));
    
  }
  return (
    <div className="app-container">
      <h1>Issue Tracker</h1>
      <form onSubmit={isEdit ? editIssueHandler : addIssueHandler} ref={formSection}> 
          <div className="form-container" > 
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
       
        <button type="submit">{ isEdit ? "Edit Issue" : "Add Issue"}</button>
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
          <button onClick={() => handleIssueDelete(issue._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;