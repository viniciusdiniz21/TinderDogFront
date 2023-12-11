import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7112",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
