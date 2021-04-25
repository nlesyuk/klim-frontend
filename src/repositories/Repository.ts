import axios from "axios";

const baseDomain =
  +process.env.VUE_APP_SERVER_ENVIRONMENT === 1
    ? process.env.VUE_APP_SERVER_PRODUCTION
    : +process.env.VUE_APP_SERVER_ENVIRONMENT === 2
    ? process.env.VUE_APP_SERVER_DEV
    : process.env.VUE_APP_SERVER_DEV_JSON_SERVER;

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
