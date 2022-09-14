import axios from "axios";
import StorageService, { keys } from "../services/storage.service";
const userStorageService = new StorageService(keys.user);
import { getRefreshToken } from "./AuthRepository";

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
    console.log("interceptors.response", originalConfig);

    if (err.response) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        !originalConfig.url.includes("auth")
      ) {
        originalConfig._retry = true;
        try {
          const user = userStorageService.get();
          if (!user?.refreshToken) {
          }
          const rs = await getRefreshToken(instance, user?.refreshToken);
          const { accessToken, refreshToken } = rs.data;
          console.log("res_interceptor", rs.data);
          userStorageService.set({
            ...user,
            accessToken,
            refreshToken
          });

          instance.defaults.headers.common["x-access-token"] = accessToken;
          return instance(originalConfig);
        } catch (_error) {
          // const msg = _error?.response?.data;
          // msg ? msg : _error;
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
