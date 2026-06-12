import axios from "axios";

const API =
  "https://multistep-registration-system.onrender.com/api";

// GET HELP
export const getHelp = () =>
  axios.get(`${API}/help`);

// GET SESSIONS
export const getSessions = () =>
  axios.get(`${API}/sessions`);

// GET LOGS
export const getLogs = () =>
  axios.get(`${API}/logs`);

// SAVE SESSION
export const saveSession = (data) =>
  axios.post(`${API}/sessions`, data);

// SAVE LOG
export const saveLog = (data) =>
  axios.post(`${API}/logs`, data);

// SEARCH SESSIONS
export const searchSessions = (key) =>
  axios.get(`${API}/search/${key}`);

// PAGINATED SESSIONS
export const getPaginatedSessions = (
  page,
  size
) =>
  axios.get(
    `${API}/sessions/page/${page}/${size}`
  );