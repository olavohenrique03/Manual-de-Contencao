const scriptPath = document.currentScript?.src || '';
const BASE_PATH = scriptPath.includes('github.io') 
  ? '/Manual-de-Contencao/' 
  : '/';

// Expor BASE_PATH globalmente
window.BASE_PATH = BASE_PATH;

fetch(BASE_PATH + "components/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    
    // Ajustar todos os links relativos para usar BASE_PATH
    document.querySelectorAll("#header a").forEach(link => {
      let href = link.getAttribute("href");
      if (href.startsWith("./")) {
        link.setAttribute("href", BASE_PATH + href.substring(2));
      }
    });
  });

fetch(BASE_PATH + "components/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });