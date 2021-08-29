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
