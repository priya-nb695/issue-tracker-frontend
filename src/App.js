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
    <div className="App">
      <h1>Issue Tracker</h1>
    </div>
  );
}

export default App;
