const scriptPath = document.currentScript?.src || '';

// Define a raiz do projeto a partir da localização real deste script.
// Assim, o site funciona em GitHub Pages independentemente do nome do
// usuário/repositório (ex.: /WildGuide/), em domínio próprio e no Live Server.
const BASE_PATH = scriptPath
  ? new URL('../', scriptPath).pathname
  : '/';

window.BASE_PATH = BASE_PATH;

const PAGE_LANGUAGE = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';

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
    if (link.matches('[data-language-target], .nav-language__current')) return;

    const href = link.getAttribute("href");
    if (!href || href === '#') return;

    const arquivoDoLink = href.split("/").pop();

    if (arquivoDoLink === arquivoAtual) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function caminhoRelativoAtual() {
  const pathname = window.location.pathname;
  let relativo = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname.replace(/^\/+/, '');

  if (!relativo || relativo.endsWith('/')) {
    relativo += 'index.html';
  }

  return relativo;
}

function configurarSeletorIdioma() {
  const relativoAtual = caminhoRelativoAtual();
  const relativoPortugues = relativoAtual.startsWith('en/')
    ? relativoAtual.slice(3)
    : relativoAtual;
  const relativoIngles = relativoAtual.startsWith('en/')
    ? relativoAtual
    : `en/${relativoAtual}`;

  document.querySelectorAll('#header [data-language-target]').forEach(link => {
    const destino = link.dataset.languageTarget === 'en'
      ? BASE_PATH + relativoIngles
      : BASE_PATH + relativoPortugues;

    link.setAttribute('href', destino);
  });
}

const headerComponent = PAGE_LANGUAGE === 'en'
  ? 'components/header-en.html'
  : 'components/header.html';

fetch(BASE_PATH + headerComponent)
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    fixRelativePaths("#header");
    configurarSeletorIdioma();
    marcarLinkAtivo();
  }).catch(erro => {
    console.error("Não foi possível carregar o header:", erro);
  });

const footerComponent = PAGE_LANGUAGE === 'en'
  ? 'components/footer-en.html'
  : 'components/footer.html';

fetch(BASE_PATH + footerComponent)
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
    fixRelativePaths("#footer");
  }).catch(erro => {
    console.error("Não foi possível carregar o footer:", erro);
  });

const modalContainer = document.getElementById("modal-container");

if (modalContainer) {
  const modalComponent = PAGE_LANGUAGE === 'en'
    ? 'components/modal-pdf-en.html'
    : 'components/modal-pdf.html';

  fetch(BASE_PATH + modalComponent)
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
