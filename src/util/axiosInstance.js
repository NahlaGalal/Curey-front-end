import axios from "axios";

export default axios.create({
  baseURL: "https://curey-backend.herokuapp.com/",
  // baseURL: "https://4e47cc42478a.ngrok.io/",
});
