import axios from "axios";

const baseDomain =
  process.env.VUE_APP_SERVER_ENVIRONMENT === "prod"
    ? process.env.VUE_APP_SERVER_PRODUCTION
    : process.env.VUE_APP_SERVER_DEV;

const apiVersion = `api`; // add /api/v1
const baseURL = `${baseDomain}/${apiVersion}`;

const instance = axios.create({
  timeout: 1000,
  baseURL
});

instance.interceptors.request.use(
  req => {
    // req.headers.userId = 1; // 1 s, 2 a
    req.headers.domain = process.env.VUE_APP_DOMAIN || "klimstepan.com";
    req.headers["x-access-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNjg2MDY2LCJleHAiOjE2NjE2ODYwNjZ9.Z2Z62j7khScb3L32oC3bFNOG-N-Tf6w8IUkhFAAdIt4";
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
