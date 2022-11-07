export * from "./constants";
import { author, currentUser } from "./constants";

export function setTitle(title) {
  const el = document.querySelector("title");
  if (el) el.innerText = `${author} | ${title}`;
}

export function handlerServerErrors(error) {
  return {
    status: error.response.status,
    statusText: error.response.statusText,
    message: error.response?.data?.message
  };
}

export function getHeightAndWidthFromDataUrl1(dataURL) {
  // dataURL must be created by URL.createObjectURL(file)
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      });
    };
    img.src = dataURL;
  });
}

export function getHeightAndWidthFromDataUrl(file) {
  const src = URL.createObjectURL(file);
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      });
    };
    img.src = src;
  });
}

export function getName(file) {
  if (!file?.src) {
    return "noname";
  }
  return `${file.src}`.split("/").pop();
}

export function setTheme() {
  const htmlElement = document?.documentElement;
  if (htmlElement) {
    const userTheme = currentUser?.theme === "dark" ? "dark" : "light";
    htmlElement.setAttribute("theme", userTheme);
  }
}
