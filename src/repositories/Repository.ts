import axios from "axios";
import StorageService, { keys } from "../services/storage.service";
const userStorageService = new StorageService(keys.user);

const baseDomain =
  process.env.VUE_APP_SERVER_ENVIRONMENT === "prod"
    ? process.env.VUE_APP_SERVER_PRODUCTION
    : process.env.VUE_APP_SERVER_DEV;

const apiVersion = `api`; // add /api/v1

const instance = axios.create({
  timeout: 1000,
  baseURL: `${baseDomain}/${apiVersion}`
});

instance.interceptors.request.use(
  req => {
    req.headers.domain = process.env.VUE_APP_DOMAIN || "klimstepan.com";
    const user = userStorageService.get();
    console.log("interceptors.request", user?.accessToken);
    if (user?.accessToken) {
      req.headers["x-access-token"] = user.accessToken;
    }

    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;

    // console.log("interceptors.response", originalConfig);
    // if (err.response) {
    //   // Access Token was expired
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const rs = await refreshToken();
    //       const { accessToken } = rs.data;
    //       window.localStorage.setItem("accessToken", accessToken);
    //       instance.defaults.headers.common["x-access-token"] = accessToken;
    //       return instance(originalConfig);
    //     } catch (_error) {
    //       if (_error.response && _error.response.data) {
    //         return Promise.reject(_error.response.data);
    //       }
    //       return Promise.reject(_error);
    //     }
    //   }
    //   if (err.response.status === 403 && err.response.data) {
    //     return Promise.reject(err.response.data);
    //   }
    // }

    return Promise.reject(err);
  }
);

export default instance;
