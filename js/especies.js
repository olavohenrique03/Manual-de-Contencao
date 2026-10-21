// Lógica compartilhada das páginas de espécies (mamíferos, aves, répteis, peixes e anfíbios).
const ESPECIES_LANG = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
const ESPECIES_UI = ESPECIES_LANG === 'en'
    ? {
        regraEspecifica: 'Specific rule',
        tecnicaPrefixo: /^(?:Primary technique|Técnica principal):\s*/i,
        porque: 'Why: ',
        nomeCientifico: 'Scientific name:',
        videoTitulo: 'Restraint demonstration video',
        especie: 'species'
      }
    : {
        regraEspecifica: 'Regra específica',
        tecnicaPrefixo: /^(?:Técnica principal|Primary technique):\s*/i,
        porque: 'Por quê: ',
        nomeCientifico: 'Nome científico:',
        videoTitulo: 'Vídeo demonstrativo de contenção',
        especie: 'espécie'
      };

// Espera que a página carregue antes um arquivo de dados que defina window.ESPECIES_DADOS.

const ESPECIES = window.ESPECIES_DADOS || {};

const $ = (seletor) => document.querySelector(seletor);

function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
}

function alternarVisibilidade(elemento, temConteudo) {
    if (elemento) elemento.hidden = !temConteudo;
}

function paraEmbedYoutube(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    if (!match) return null;

    const params = new URLSearchParams({
        controls: '1',
        mute: true,
        controls: 0,
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        fs: '1'
    });

    return `https://www.youtube-nocookie.com/embed/${match[1]}?${params.toString()}`;
}

function juntarComoTexto(itens) {
    if (!Array.isArray(itens) || itens.length === 0) return '';
    return itens.map(item => String(item).trim().replace(/[.;]\s*$/, '')).join('. ') + '.';
}

function textoFlexivel(valor, modo = 'frases') {
    if (typeof valor === 'string') return valor.trim();
    if (!Array.isArray(valor) || valor.length === 0) return '';
    return modo === 'virgulas'
        ? valor.map(item => String(item).trim().replace(/[.;,]\s*$/, '')).join(', ') + '.'
        : juntarComoTexto(valor);
}

function renderizarLista(container, itens, classeItem) {
    if (!container) return;
    container.replaceChildren();

    (Array.isArray(itens) ? itens : []).forEach(texto => {
        container.appendChild(criar('li', classeItem, texto));
    });
}

function renderizarRegraSubgrupo(animal) {
    const bloco = $('.regra-subgrupo');
    const titulo = $('.regra-subgrupo__titulo');
    const texto = $('.regra-subgrupo__texto');
    const regra = animal.regraSubgrupo;
    const temRegra = Boolean(regra?.texto);

    if (temRegra) {
        titulo.textContent = regra.titulo || ESPECIES_UI.regraEspecifica;
        texto.textContent = regra.texto;
    } else {
        titulo.textContent = '';
        texto.textContent = '';
    }

    alternarVisibilidade(bloco, temRegra);
    return temRegra;
}

function renderizarIntroducao(animal) {
    const secao = $('.especie-introducao');
    const descricao = $('.especie-introducao__descricao');
    const antes = $('.especie-introducao__antes');
    const antesTexto = $('.especie-introducao__antes-texto');

    const temDescricao = Boolean(animal.descricao);
    const temAntes = Boolean(animal.antesDeConter);

    descricao.textContent = animal.descricao || '';
    antesTexto.textContent = animal.antesDeConter || '';

    alternarVisibilidade(descricao, temDescricao);
    alternarVisibilidade(antes, temAntes);
    alternarVisibilidade(secao, temDescricao || temAntes);
}

function renderizarTecnica(animal) {
    const blocoTecnica = $('.tecnica-principal');
    const indicacao = $('.tecnica-principal__indicacao');
    const passos = $('.passos');
    const observacao = $('.tecnica-principal__observacao');
    const blocoPorque = $('.porque');
    const porqueTexto = $('.porque__texto');

    const tecnica = animal.tecnica;
    const temTecnica = Boolean(tecnica);

    indicacao.replaceChildren();
    passos.replaceChildren();
    observacao.textContent = '';
    porqueTexto.replaceChildren();

    if (!temTecnica) {
        alternarVisibilidade(blocoTecnica, false);
        alternarVisibilidade(observacao, false);
        alternarVisibilidade(blocoPorque, false);
        return false;
    }

    if (tecnica.titulo) {
        const tituloLimpo = tecnica.titulo.replace(ESPECIES_UI.tecnicaPrefixo, '');
        indicacao.appendChild(criar('strong', null, `${tituloLimpo}. `));
    }

    if (tecnica.indicacao) {
        indicacao.appendChild(document.createTextNode(tecnica.indicacao));
    }

    if (tecnica.passos?.length) {
        tecnica.passos.forEach(passo => {
            const li = criar('li', 'passos__item');
            li.appendChild(criar('strong', 'passos__titulo', passo.titulo));
            li.appendChild(document.createTextNode(`: ${passo.descricao}`));
            passos.appendChild(li);
        });
    }

    const temObservacao = Boolean(tecnica.observacao);
    if (temObservacao) observacao.textContent = tecnica.observacao;

    const temPorque = Boolean(tecnica.porque);
    if (temPorque) {
        porqueTexto.appendChild(criar('strong', null, ESPECIES_UI.porque));
        porqueTexto.appendChild(document.createTextNode(tecnica.porque));
    }

    alternarVisibilidade(observacao, temObservacao);
    alternarVisibilidade(blocoTecnica, true);
    alternarVisibilidade(blocoPorque, temPorque);
    return true;
}

function renderizarAlternativas(animal) {
    const bloco = $('.alternativas');
    const texto = $('.alternativas__texto');
    const conteudo = textoFlexivel(animal.alternativas, 'frases');
    const temAlternativas = Boolean(conteudo);

    texto.textContent = conteudo;
    alternarVisibilidade(bloco, temAlternativas);
    return temAlternativas;
}

function renderizarMateriais(animal) {
    const bloco = $('.materiais');
    const texto = $('.materiais__texto');
    const conteudo = textoFlexivel(animal.materiais, 'virgulas');
    const temMateriais = Boolean(conteudo);

    texto.textContent = conteudo;
    alternarVisibilidade(bloco, temMateriais);
    return temMateriais;
}

function renderizarAlertas(animal) {
    const blocoAlertas = $('.conteudo__alertas');
    const nunca = $('.alerta--perigo');
    const interrompa = $('.alerta--atencao');

    const temNunca = Boolean(animal.nuncaFaca?.length);
    const temInterrompa = Boolean(animal.interrompaSe?.length);

    renderizarLista($('.alerta--perigo .alerta__lista'), temNunca ? animal.nuncaFaca : []);
    renderizarLista($('.alerta--atencao .alerta__lista'), temInterrompa ? animal.interrompaSe : []);

    alternarVisibilidade(nunca, temNunca);
    alternarVisibilidade(interrompa, temInterrompa);
    alternarVisibilidade(blocoAlertas, temNunca || temInterrompa);
    return temNunca || temInterrompa;
}

function renderizarVideo(url, nomeAnimal) {
    const secao = $('.video-secao');
    const player = $('.video-secao__player');

    if (!url) {
        player.removeAttribute('src');
        alternarVisibilidade(secao, false);
        return false;
    }

    player.src = paraEmbedYoutube(url) || url;
    player.title = `${ESPECIES_UI.videoTitulo} - ${nomeAnimal}`;
    alternarVisibilidade(secao, true);
    return true;
}

function carregarAnimal(chave, variacao = null, nomeVariacao = null) {
    const animal = ESPECIES[chave];
    if (!animal) return;

    renderizarRegraSubgrupo(animal);

    $('.descricao__nome').textContent = animal.nome || '';

    const temCientifico = Boolean(animal.nomeCientifico);
    $('.nome-cientifico__valor').textContent = animal.nomeCientifico || '';
    $('.nome-cientifico__rotulo').textContent = animal.rotuloCientifico || ESPECIES_UI.nomeCientifico;
    alternarVisibilidade($('.nome-cientifico'), temCientifico);

    $('.informacoes-complemento').textContent = animal.classificacao || '';
    alternarVisibilidade($('.informacoes-complemento'), Boolean(animal.classificacao));

    const cobertas = $('.especies-cobertas__texto');
    cobertas.textContent = animal.especiesCobertas || '';
    alternarVisibilidade($('.especies-cobertas'), Boolean(animal.especiesCobertas));

    // Nos submenus, varia apenas o vídeo; o restante da ficha é compartilhado.
    const videoSelecionado = variacao !== null
        ? (animal.videosPorEspecie?.[variacao] || '')
        : animal.video;
    const temVideo = renderizarVideo(videoSelecionado, nomeVariacao || animal.nome || ESPECIES_UI.especie);
    renderizarIntroducao(animal);

    const temTecnica = renderizarTecnica(animal);
    const temAlternativas = renderizarAlternativas(animal);
    const temAlertas = renderizarAlertas(animal);
    const temMateriais = renderizarMateriais(animal);

    const temConteudoFicha = temTecnica || temAlternativas || temAlertas || temMateriais;
    alternarVisibilidade($('.conteudo'), temConteudoFicha);

    const temDados = Boolean(
        animal.nomeCientifico ||
        animal.classificacao ||
        animal.especiesCobertas ||
        animal.descricao ||
        animal.antesDeConter ||
        temVideo ||
        temConteudoFicha
    );

    alternarVisibilidade($('.em-breve'), !temDados);
}

const itensMenu = document.querySelectorAll('.animais-menu__item');
const lista = $('.animais-menu__lista');
const menuWrapper = $('.animais-menu__wrapper');
const btnPrev = $('.animais-menu__seta--prev');
const btnNext = $('.animais-menu__seta--next');

function atualizarControlesMenu() {
    if (!lista || !btnPrev || !btnNext) return;

    const tolerancia = 2;
    const larguraDisponivelSemSetas = menuWrapper?.clientWidth || lista.clientWidth;
    const temOverflow = lista.scrollWidth > larguraDisponivelSemSetas + tolerancia;

    btnPrev.hidden = !temOverflow;
    btnNext.hidden = !temOverflow;

    if (!temOverflow) return;

    btnPrev.disabled = lista.scrollLeft <= tolerancia;
    btnNext.disabled = lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - tolerancia;
}

function centralizarItemNoMenu(item) {
    if (!lista || !item) return;

    item.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'nearest'
    });
}

// Dropdowns de grupos: estrutura reutilizável em qualquer página de espécies.
const submenus = document.querySelectorAll('.animais-menu__submenu[data-submenu-id]');
let submenuAberto = null;

function fecharSubmenus() {
    submenus.forEach(submenu => { submenu.hidden = true; });
    itensMenu.forEach(item => {
        if (item.dataset.submenu) item.setAttribute('aria-expanded', 'false');
    });
    submenuAberto = null;
}

function posicionarSubmenu(item, submenu) {
    const container = item.closest('.animais-menu')?.querySelector('.container');
    if (!container) return;
    const origem = container.getBoundingClientRect();
    const gatilho = item.getBoundingClientRect();
    // O submenu fica fora da lista com overflow-x, mantendo-se visível no mobile.
    const margem = 8;
    const largura = submenu.offsetWidth;
    const deslocamento = gatilho.left - origem.left;
    const maxEsquerda = Math.max(margem, origem.width - largura - margem);
    submenu.style.left = `${Math.max(margem, Math.min(deslocamento, maxEsquerda))}px`;
    submenu.style.top = `${gatilho.bottom - origem.top + 5}px`;
}

function alternarSubmenu(item) {
    const submenu = [...submenus].find(menu => menu.dataset.submenuId === item.dataset.submenu);
    if (!submenu) return;
    const jaAberto = submenuAberto === submenu;
    fecharSubmenus();
    if (jaAberto) return;
    submenu.hidden = false;
    item.setAttribute('aria-expanded', 'true');
    submenuAberto = submenu;
    posicionarSubmenu(item, submenu);
}

function selecionarItem(item, variacao = null, nomeVariacao = null) {
    fecharSubmenus();
    itensMenu.forEach(i => {
        const ativo = i === item;
        i.classList.toggle('ativo', ativo);
        i.setAttribute('aria-pressed', String(ativo));
    });

    document.querySelectorAll('.animais-menu__submenu-item').forEach(opcao => {
        const selecionada = item.dataset.submenu === opcao.closest('[data-submenu-id]')?.dataset.submenuId
            && variacao === opcao.dataset.variacao;
        opcao.classList.toggle('ativo', selecionada);
        opcao.setAttribute('aria-pressed', String(selecionada));
    });

    carregarAnimal(item.dataset.animal, variacao, nomeVariacao);
    centralizarItemNoMenu(item);
    window.setTimeout(atualizarControlesMenu, 220);
}

itensMenu.forEach(item => item.addEventListener('click', () => {
    if (item.dataset.submenu) {
        alternarSubmenu(item);
    } else {
        selecionarItem(item);
    }
}));

submenus.forEach(submenu => {
    submenu.querySelectorAll('.animais-menu__submenu-item').forEach(opcao => {
        opcao.setAttribute('aria-pressed', 'false');
        opcao.addEventListener('click', () => {
            const gatilho = [...itensMenu].find(item => item.dataset.submenu === submenu.dataset.submenuId);
            if (gatilho) selecionarItem(gatilho, opcao.dataset.variacao, opcao.textContent.trim());
        });
    });
});

document.addEventListener('click', evento => {
    if (submenuAberto && !evento.target.closest('.animais-menu__submenu, .animais-menu__item--dropdown')) {
        fecharSubmenus();
    }
});

document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && submenuAberto) {
        const gatilho = [...itensMenu].find(item => item.dataset.submenu === submenuAberto.dataset.submenuId);
        fecharSubmenus();
        gatilho?.focus();
    }
});

window.addEventListener('resize', fecharSubmenus);
lista?.addEventListener('scroll', fecharSubmenus, { passive: true });

if (btnPrev && btnNext && lista) {
    const rolarMenu = (direcao) => {
        const passo = Math.max(lista.clientWidth * 0.7, 220);
        lista.scrollBy({ left: passo * direcao, behavior: 'smooth' });
    };

    btnPrev.addEventListener('click', () => rolarMenu(-1));
    btnNext.addEventListener('click', () => rolarMenu(1));
    lista.addEventListener('scroll', atualizarControlesMenu, { passive: true });

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(atualizarControlesMenu);
        observer.observe(lista);
    } else {
        window.addEventListener('resize', atualizarControlesMenu);
    }
}

const itemInicial = document.querySelector('.animais-menu__item.ativo') || itensMenu[0];
if (itemInicial) selecionarItem(itemInicial);
requestAnimationFrame(atualizarControlesMenu);
