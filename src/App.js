import React,{ useEffect, useState} from "react";
import { getIssues } from "./services/issueService";

function App() {
  const [issues,setIssues] = useState([]);
 
  useEffect(()=>{
    fetchIssues();
  },[]);
  
  const fetchIssues = async () => {
    const issues = await getIssues ();
    setIssues(issues);
  }

  return (
    <div >
      <h1>Issue Tracker</h1>
      {issues?.map((issue) => (
        <div key={issue.id}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
          <p>Priority: {issue.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
