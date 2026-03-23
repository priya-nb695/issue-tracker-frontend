import React, { useEffect, useState, useRef } from "react";
import {
  getIssues,
  addIssue,
  editIssue,
  deleteIssue,
} from "./services/issueService";
import "./main.css";

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Low");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const formSection = useRef(null);

  const [errorObj, setErrorObj] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    setErrorObj({
      title: "",
      description: "",
    });
  }, [title, description]);

  const fetchIssues = async () => {
    const data = await getIssues();
    setIssues(data);
  };

  const handleValidation = () => {
    let hasError = false;

    if (title.trim() === "") {
      setErrorObj((prev) => ({
        ...prev,
        title: "Please enter title",
      }));
      hasError = true;
    }

    if (description.trim() === "") {
      setErrorObj((prev) => ({
        ...prev,
        description: "Please enter description",
      }));
      hasError = true;
    }

    return hasError;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Open");
    setPriority("Low");
    setIsEdit(false);
    setEditId("");
  };

  const addIssueHandler = async (e) => {
    e.preventDefault();

    if (handleValidation()) return;

    const payload = { title, description, status, priority };

    const newIssue = await addIssue(payload);
    setIssues((prev) => [...prev, newIssue]);

    resetForm();
  };

  const editIssueHandler = async (e) => {
    e.preventDefault();

    if (handleValidation()) return;

    const payload = { title, description, status, priority };

    const updatedIssue = await editIssue(editId, payload);

    setIssues((prev) =>
      prev.map((el) => (el._id === editId ? updatedIssue : el))
    );

    resetForm();
  };

  const handleIssueEdit = (id) => {
    const editObj = issues.find((obj) => id === obj._id);

    formSection.current.scrollIntoView({ behavior: "smooth" });

    setEditId(editObj._id);
    setIsEdit(true);
    setTitle(editObj.title || "");
    setDescription(editObj.description || "");
    setStatus(editObj.status);
    setPriority(editObj.priority);
  };

  const handleIssueDelete = async (id) => {
    await deleteIssue(id);
    setIssues((prev) => prev.filter((el) => el._id !== id));
  };

  return (
    <div className="app-container">
      <h1>🚀 Issue Tracker</h1>

      <form
        onSubmit={isEdit ? editIssueHandler : addIssueHandler}
        ref={formSection}
      >
        <div className="form-container">
          <input
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errorObj.title && <p className="error-text">{errorObj.title}</p>}

          <input
            type="text"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errorObj.description && (
            <p className="error-text">{errorObj.description}</p>
          )}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button type="submit">
          {isEdit ? "Update Issue" : "Add Issue"}
        </button>
      </form>

      <hr />

      <h2>Issue List</h2>

      {issues.length === 0 && <p className="empty">No issues yet 🚀</p>}

      {issues.map((issue) => (
        <div key={issue._id} className="issue-container">
          <div className="issue-header">
            <h3>{issue.title}</h3>
            <span className={`badge ${issue.priority.toLowerCase()}`}>
              {issue.priority}
            </span>
          </div>

          <p>{issue.description}</p>

          <span className={`status ${issue.status.toLowerCase()}`}>
            {issue.status}
          </span>

          <div className="actions">
            <button onClick={() => handleIssueEdit(issue._id)}>
              Edit
            </button>
            <button onClick={() => handleIssueDelete(issue._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;