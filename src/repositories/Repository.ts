import axios from "axios";

// const baseDomain = "http://localhost:3000"; // json-server
// const baseDomain = "http://localhost:8090"; // local nodejs api
const baseDomain = "http://138.68.74.145"; // digitalOcean nodejs api

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
