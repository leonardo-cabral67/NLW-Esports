import axios from "axios";

export const nlwApi = axios.create({
  baseURL: "http://localhost:3333",
});

