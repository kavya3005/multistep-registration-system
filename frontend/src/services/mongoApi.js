import axios from "axios";

const API = "http://localhost:5000/api";

export const getHelp = () =>
  axios.get(`${API}/help`);

export const getSessions = () =>
  axios.get(`${API}/sessions`);

export const getLogs = () =>
  axios.get(`${API}/logs`);

export const saveSession = (data) =>
  axios.post(`${API}/sessions`, data);

export const saveLog = (data) =>
  axios.post(`${API}/logs`, data);
export const searchSessions = (key) =>
  axios.get(
    `${API}/search/${key}`
  );
  export const getPaginatedSessions = (
  page,
  size
) =>
  axios.get(
    `${API}/sessions/page/${page}/${size}`
  );