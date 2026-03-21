import React, { useEffect, useState } from "react";
import { getIssues } from "./services/issueService";

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const data = await getIssues();
    setIssues(data);
  };

  const addIssueHandler = () => {
   console.log("issue submitted");
  }
  return (
    <div>
      <h1>Issue Tracker</h1>
      <form onSubmit={addIssueHandler}>  
        <input type="text" name="title" placeholder="Enter the Title"/>
        <input type="text" name="description" placeholder="Enter the Description"/>
      </form>


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