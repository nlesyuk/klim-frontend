export function setTitle(title) {
  const el = document.querySelector("title");
  if (el) el.innerText = `${process.env.VUE_APP_NAME} | ${title}`;
}

export function handlerServerErrors(error) {
  return {
    status: error.response.status,
    statusText: error.response.statusText,
    message: error.response?.data?.message
  };
}
