const scriptPath = document.currentScript?.src || '';
const BASE_PATH = scriptPath.includes('github.io')
  ? '/Manual-de-Contencao/'
  : '/';

window.BASE_PATH = BASE_PATH;

function fixRelativePaths(containerSelector) {
  document.querySelectorAll(containerSelector + " a, " + containerSelector + " img").forEach(el => {
    ["href", "src"].forEach(attr => {
      const value = el.getAttribute(attr);
      if (!value) return;

      if (value.startsWith("./")) {
        el.setAttribute(attr, BASE_PATH + value.slice(2));
      } else if (value.startsWith("../")) {
        el.setAttribute(attr, BASE_PATH + value.slice(3));
      }
    });
  });
}

fetch(BASE_PATH + "components/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    fixRelativePaths("#header");
  });

fetch(BASE_PATH + "components/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
    fixRelativePaths("#footer");
  });