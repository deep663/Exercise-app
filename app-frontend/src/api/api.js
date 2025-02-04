import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// User Authentication APIs
export const login = async (email, password) =>
  await axios.post(`${API_BASE_URL}/user/login`, { email, password }, { withCredentials: true });

export const register = async (name, email, password) =>
  await axios.post(`${API_BASE_URL}/user/register`, { name, email, password });

// Task APIs
export const assignTasks = async (userId) =>
  await axios.get(`${API_BASE_URL}/tasks/assign/${userId}`, { withCredentials: true });

export const completeTask = async (userId, taskName) =>
  await axios.post(`${API_BASE_URL}/tasks/complete-task/${userId}`, {
    taskName,
  },{ withCredentials: true });

export const completeDay = async (userId) =>
  await axios.post(`${API_BASE_URL}/tasks/complete-day/${userId}`, { withCredentials: true });

export const getProgress = async (userId) =>
  await axios.get(`${API_BASE_URL}/tasks/progress/${userId}`,{ withCredentials: true });

export const getGuide = async (taskName) =>
  await axios.post(`${API_BASE_URL}/tasks/guide`, { taskName});
