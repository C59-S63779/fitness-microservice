/** @format */

import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers["X-User-ID"] = userId;
  }
});

export const getActivities = () => api.get("/activities");
export const addActivity = () => api.post("/activity", activity);
export const addActivityDetail = () =>
  api.get("/recommendations/activity/${id}");
