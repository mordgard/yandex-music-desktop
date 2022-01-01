const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);

    if (element) {
      element.innerText = text;
    }
  };

  for (const data of ["chrome", "node", "electron"]) {
    replaceText(`${data}-version`, process.versions[data]);
  }
});

ipcRenderer.on("process-info", (_event, processPlatform) => {
  document.querySelector("#platform").innerHTML = `${processPlatform}`;
});

const button = document.querySelector("button");

button.addEventListener("click", () => {
  ipcRenderer.send("get-info");
});
