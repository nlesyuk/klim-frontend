import RepositoryFactory from "@/repositories/RepositoryFactory";
const AuthRepository = RepositoryFactory.get("auth");
import StorageService from "./storage.service";
export const userStorageService = new StorageService("user");
import { IUser } from "@/helper/interfaces";

class AuthService {
  async login(user) {
    try {
      const res = await AuthRepository.signin(user);
      const userData = res?.data;
      console.log("rawUser", res);
      if (userData?.accessToken) {
        userStorageService.set(userData); // save User data client storage
      }
      return Promise.resolve(userData);
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message;
      return Promise.reject(msg);
    }
  }

  async logout(userId) {
    try {
      if (userId) {
        await AuthRepository.signout(userId);
      }
      userStorageService.remove();
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async signup(user) {
    try {
      if (user) {
        await AuthRepository.signup(user);
      }
      return Promise.resolve(true);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async refreshToken(token) {
    try {
      let res;
      if (token) {
        res = await AuthRepository.refreshToken(token);
      }
      return Promise.resolve(res);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  authHeader() {
    // ?
    const user: IUser | null = userStorageService.get();
    return user?.accessToken ? { "x-access-token": user.accessToken } : {};
  }
}

export default new AuthService();

// Автологин выглядит примерно так. Вы делаете запрос с фронта, он падает
// потому что протух токен, ловим ошибку по логину и с рефреш токеном идём на
// сервер за получением нового. Если рефреш не протух вы перелогинетесь иначе
// придётся вводить все заново
