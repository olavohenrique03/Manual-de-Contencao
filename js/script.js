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
      } 
    });
  });
}

function marcarLinkAtivo() {
    const arquivoAtual = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("#header .nav-link, #header .dropdown-item").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const arquivoDoLink = href.split("/").pop();

    if (arquivoDoLink === arquivoAtual) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

fetch(BASE_PATH + "components/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    fixRelativePaths("#header");
    marcarLinkAtivo();
  }).catch(erro => {
    console.error("Não foi possível carregar o header:", erro);
  })

fetch(BASE_PATH + "components/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
    fixRelativePaths("#footer");
  }).catch(erro => {
    console.error("Não foi possível carregar o footer:", erro);
  });

const modalContainer = document.getElementById("modal-container");

if (modalContainer) {
  fetch(BASE_PATH + "components/modal-pdf.html")
    .then(response => response.text())
    .then(data => {
      modalContainer.innerHTML = data;
    })
    .catch(erro => {
      console.error("Não foi possível carregar o modal de PDF:", erro);
    });
}

// Enquanto os currículos ainda não possuem URL, evita o salto para o topo da página.
// Ao substituir href="#" por uma URL real, o link passa a funcionar normalmente.
document.addEventListener("click", event => {
  const linkPendente = event.target.closest('a[data-curriculo-pendente="true"][href="#"]');

  if (linkPendente) {
    event.preventDefault();
  }
});



