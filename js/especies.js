// Lógica compartilhada das páginas de espécies (mamíferos, aves, répteis...).
// Espera que a página carregue antes um arquivo de dados que defina window.ESPECIES_DADOS.

const ESPECIES = window.ESPECIES_DADOS || {};

// ---------- Helpers ----------

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

function juntarComVirgulas(itens) {
    if (!Array.isArray(itens) || itens.length === 0) return '';
    return itens.map(item => String(item).trim().replace(/[.;,]\s*$/, '')).join(', ') + '.';
}

// ---------- Renderizadores ----------

function renderizarLista(container, itens, classeItem) {
    if (!container) return;
    container.replaceChildren();

    itens.forEach(texto => {
        container.appendChild(criar('li', classeItem, texto));
    });
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
    const blocoPorque = $('.porque');
    const porqueTexto = $('.porque__texto');

    const tecnica = animal.tecnica;
    const temTecnica = Boolean(tecnica);

    indicacao.replaceChildren();
    passos.replaceChildren();
    porqueTexto.replaceChildren();

    if (!temTecnica) {
        alternarVisibilidade(blocoTecnica, false);
        alternarVisibilidade(blocoPorque, false);
        return false;
    }

    if (tecnica.titulo) {
        const tituloLimpo = tecnica.titulo.replace(/^Técnica principal:\s*/i, '');
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

    const temPorque = Boolean(tecnica.porque);
    if (temPorque) {
        porqueTexto.appendChild(criar('strong', null, 'Por quê: '));
        porqueTexto.appendChild(document.createTextNode(tecnica.porque));
    }

    alternarVisibilidade(blocoTecnica, true);
    alternarVisibilidade(blocoPorque, temPorque);
    return true;
}

function renderizarAlternativas(animal) {
    const bloco = $('.alternativas');
    const texto = $('.alternativas__texto');
    const temAlternativas = Boolean(animal.alternativas?.length);

    texto.textContent = temAlternativas ? juntarComoTexto(animal.alternativas) : '';
    alternarVisibilidade(bloco, temAlternativas);

    return temAlternativas;
}

function renderizarMateriais(animal) {
    const bloco = $('.materiais');
    const texto = $('.materiais__texto');
    const temMateriais = Boolean(animal.materiais?.length);

    texto.textContent = temMateriais ? juntarComVirgulas(animal.materiais) : '';
    alternarVisibilidade(bloco, temMateriais);

    return temMateriais;
}

function renderizarAlertas(animal) {
    const blocoAlertas = $('.conteudo__alertas');
    const nunca = $('.alerta--perigo');
    const interrompa = $('.alerta--atencao');

    const temNunca = Boolean(animal.nuncaFaca?.length);
    const temInterrompa = Boolean(animal.interrompaSe?.length);

    if (temNunca) {
        renderizarLista($('.alerta--perigo .alerta__lista'), animal.nuncaFaca);
    }

    if (temInterrompa) {
        renderizarLista($('.alerta--atencao .alerta__lista'), animal.interrompaSe);
    }

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
    player.title = `Vídeo demonstrativo de contenção - ${nomeAnimal}`;
    alternarVisibilidade(secao, true);
    return true;
}

// ---------- Carregamento de um animal ----------

function carregarAnimal(chave) {
    const animal = ESPECIES[chave];
    if (!animal) return;

    $('.descricao__nome').textContent = animal.nome || '';

    const temCientifico = Boolean(animal.nomeCientifico);
    $('.nome-cientifico__valor').textContent = animal.nomeCientifico || '';
    alternarVisibilidade($('.nome-cientifico'), temCientifico);

    $('.informacoes-complemento').textContent = animal.classificacao || '';
    alternarVisibilidade($('.informacoes-complemento'), Boolean(animal.classificacao));

    const temVideo = renderizarVideo(animal.video, animal.nome || 'espécie');
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
        animal.descricao ||
        animal.antesDeConter ||
        temVideo ||
        temConteudoFicha
    );

    alternarVisibilidade($('.em-breve'), !temDados);
}

// ---------- Menu de animais ----------

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

function selecionarItem(item) {
    itensMenu.forEach(i => {
        const ativo = i === item;
        i.classList.toggle('ativo', ativo);
        i.setAttribute('aria-pressed', String(ativo));
    });

    carregarAnimal(item.dataset.animal);
    centralizarItemNoMenu(item);
    window.setTimeout(atualizarControlesMenu, 220);
}

itensMenu.forEach(item => {
    item.addEventListener('click', () => selecionarItem(item));
});

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

// Carrega o primeiro animal por padrão
const itemInicial = document.querySelector('.animais-menu__item.ativo') || itensMenu[0];
if (itemInicial) selecionarItem(itemInicial);

requestAnimationFrame(atualizarControlesMenu);
