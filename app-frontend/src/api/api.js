import axios from "axios";

axios.defaults.withCredentials = true;

// User Authentication APIs
export const login = async (email, password) =>
  await axios.post("api/user/login", { email, password });

export const register = async (name, email, password) =>
  await axios.post(`api/user/register`, { name, email, password });

// Task APIs
export const assignTasks = async (userId) =>
  await axios.get(`api/tasks/assign/${userId}`);

export const completeTask = async (userId, taskName) =>
  await axios.post(`api/tasks/complete-task/${userId}`, {
    taskName,
  },{ withCredentials: true });

export const completeDay = async (userId) =>
  await axios.post(`api/tasks/complete-day/${userId}`);

export const getProgress = async (userId) =>
  await axios.get(`api/tasks/progress/${userId}`);

export const getGuide = async (taskName) =>
  await axios.post(`api/tasks/guide`, { taskName});
