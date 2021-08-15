import axios from "axios";

const baseDomain =
  process.env.VUE_APP_SERVER_ENVIRONMENT === "prod"
    ? process.env.VUE_APP_SERVER_PRODUCTION
    : process.env.VUE_APP_SERVER_ENVIRONMENT === "dev"
    ? process.env.VUE_APP_SERVER_DEV
    : process.env.VUE_APP_SERVER_DEV_JSON_SERVER;

const baseURL = `${baseDomain}/api`;

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  req => {
    req.headers.author = "s";
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
