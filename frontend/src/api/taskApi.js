import axios from "axios";
import { getToken } from "../utils/token";

// Fetch tasks
export const fetchTasks = async () => {
  const response = await axios.get("/api/tasks", {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Create a task
export const createTask = async (task) => {
  const response = await axios.post("/api/tasks", task, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Update a task
export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.put(`/api/tasks/${taskId}`, updatedTask, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`/api/tasks/${taskId}`, {
    headers: {
      "x-auth-token": getToken(),
    },
  });
  return response.data;
};