import axios from "axios";

const API_URL = "http://localhost:8000";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const pollApi = axios.create({
    baseURL: `${API_URL}/poll/active`,
    timeout: 10000,
});

export const gamesApi = axios.create({
    baseURL: `${API_URL}/games`,
    timeout: 10000,
});

export const contactApi = axios.create({
    baseURL: `${API_URL}/contacts`,
    timeout: 10000,
});