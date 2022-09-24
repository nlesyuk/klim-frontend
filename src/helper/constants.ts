// general
export const domain = process.env.VUE_APP_DOMAIN || "klimstepan.com";

export const isCinematographerMode = domain === "klimstepan.com";

// server
export const serverDomain =
  process.env.VUE_APP_SERVER_ENVIRONMENT === "prod"
    ? process.env.VUE_APP_SERVER_PRODUCTION
    : process.env.VUE_APP_SERVER_DEV;

export const apiVersion = `api/v1`;

export const APIURL = `${serverDomain}/${apiVersion}`;

// front end
const mainMenu = [
  { name: "slider", isSinematographer: true, isPhotographer: true },
  { name: "works", isSinematographer: true, isPhotographer: false },
  { name: "shots", isSinematographer: true, isPhotographer: false },
  { name: "photos", isSinematographer: true, isPhotographer: true },
  { name: "contacts", isSinematographer: true, isPhotographer: true }
];

export const menuSinematographer = mainMenu
  .filter(v => v.isSinematographer)
  .map(v => v.name);

export const menuPhotographer = mainMenu
  .filter(v => v.isPhotographer)
  .map(v => v.name);

export const menu = isCinematographerMode
  ? menuSinematographer
  : menuPhotographer;

export const cinematographerCategories = [
  "all",
  "automotive",
  "fashion",
  "lifestyle",
  "personal"
];

export const photographerCategories = [
  "all",
  "automotive",
  "fashion",
  "lifestyle",
  "personal"
];

export const categories = isCinematographerMode
  ? cinematographerCategories
  : photographerCategories;
