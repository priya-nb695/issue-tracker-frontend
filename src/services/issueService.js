import axios from "axios";

const API_URL = "http://localhost:5000/issues";

export const getIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addIssue = async (body) =>{
  const response = await axios.post(API_URL,body);
  return response.data;
}

export const editIssue = async (id, data) => {
  const res = await fetch(`http://localhost:5000/issues/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteIssue = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}