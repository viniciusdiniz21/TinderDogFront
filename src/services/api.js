import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7041",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
