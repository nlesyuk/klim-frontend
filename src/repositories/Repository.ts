import axios from "axios";

// const baseDomain = "http://localhost:3000";
// const baseDomain = "http://localhost:8090";
const baseDomain = "http://138.68.74.145";

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
