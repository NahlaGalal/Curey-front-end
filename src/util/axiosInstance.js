import axios from "axios";

const api_token = localStorage["curey-state"] ? localStorage["curey-state"].api_token : "";

export default axios.create({
  baseURL: "https://curey-backend.herokuapp.com/",
});
