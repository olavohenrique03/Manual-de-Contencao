// Lógica compartilhada das páginas de espécies (mamíferos, aves, répteis...).
// Espera que a página carregue antes um arquivo de dados que defina window.ESPECIES_DADOS.

const ESPECIES = window.ESPECIES_DADOS || {};

// ---------- Helpers ----------

const $ = (seletor) => document.querySelector(seletor);

// Cria um elemento com classe e texto (textContent evita injetar HTML por engano)
function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
}

// Mostra/esconde um bloco inteiro conforme haja conteúdo
function alternarVisibilidade(elemento, temConteudo) {
    if (elemento) elemento.hidden = !temConteudo;
}

// Converte qualquer formato de link do YouTube para o formato embed
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

// ---------- Renderizadores ----------

function renderizarLista(container, itens, classeItem) {
    container.replaceChildren();
    itens.forEach(texto => container.appendChild(criar('li', classeItem, texto)));
}

function renderizarProcedimentos(animal) {
    const corpo = $('.conteudo__procedimentos-corpo');
    corpo.replaceChildren();

    // Antes de conter
    if (animal.antesDeConter) {
        const bloco = criar('div', 'procedimento-bloco');
        bloco.appendChild(criar('h4', 'procedimento-bloco__titulo', 'Antes de conter'));
        bloco.appendChild(criar('p', 'procedimento-bloco__texto', animal.antesDeConter));
        corpo.appendChild(bloco);
    }

    // Técnica principal (indicação + passos + por quê)
    const tecnica = animal.tecnica;
    if (tecnica) {
        const bloco = criar('div', 'procedimento-bloco');
        bloco.appendChild(criar('h4', 'procedimento-bloco__titulo', tecnica.titulo));

        if (tecnica.indicacao) {
            bloco.appendChild(criar('p', 'procedimento-bloco__texto', tecnica.indicacao));
        }

        if (tecnica.passos?.length) {
            const ol = criar('ol', 'passos');
            tecnica.passos.forEach(passo => {
                const li = criar('li', 'passos__item');
                li.appendChild(criar('strong', 'passos__titulo', passo.titulo));
                li.appendChild(document.createTextNode(`: ${passo.descricao}`));
                ol.appendChild(li);
            });
            bloco.appendChild(ol);
        }

        if (tecnica.porque) {
            const nota = criar('p', 'procedimento-nota');
            nota.appendChild(criar('strong', null, 'Por quê: '));
            nota.appendChild(document.createTextNode(tecnica.porque));
            bloco.appendChild(nota);
        }

        corpo.appendChild(bloco);
    }

    // Alternativas
    if (animal.alternativas?.length) {
        const bloco = criar('div', 'procedimento-bloco');
        bloco.appendChild(criar('h4', 'procedimento-bloco__titulo', 'Alternativas'));
        const ul = criar('ul', 'procedimento-lista');
        renderizarLista(ul, animal.alternativas);
        bloco.appendChild(ul);
        corpo.appendChild(bloco);
    }

    return corpo.children.length > 0;
}

function renderizarVideo(url) {
    const secao = $('.video-secao');
    const player = $('.video-secao__player');

    if (!url) {
        player.removeAttribute('src');
        alternarVisibilidade(secao, false);
        return;
    }

    player.src = paraEmbedYoutube(url) || url; // se não for YouTube, usa a URL original
    alternarVisibilidade(secao, true);
}

// ---------- Carregamento de um animal ----------

function carregarAnimal(chave) {
    const animal = ESPECIES[chave];
    if (!animal) return;

    // Cabeçalho da espécie
    $('.descricao__nome').textContent = animal.nome;

    const temCientifico = Boolean(animal.nomeCientifico);
    $('.nome-cientifico__valor').textContent = animal.nomeCientifico || '';
    alternarVisibilidade($('.nome-cientifico'), temCientifico);

    $('.informacoes-complemento').textContent = animal.classificacao || '';
    alternarVisibilidade($('.informacoes-complemento'), Boolean(animal.classificacao));

    $('.descricao__texto').textContent = animal.descricao || '';
    alternarVisibilidade($('.descricao__bloco'), Boolean(animal.descricao));

    // Vídeo
    renderizarVideo(animal.video);

    // Conteúdo (materiais, procedimentos, alertas)
    $('.conteudo__titulo').textContent = animal.tituloConteudo || '';

    const temMateriais = Boolean(animal.materiais?.length);
    if (temMateriais) renderizarLista($('.conteudo__materiais-lista'), animal.materiais, 'conteudo__item');
    alternarVisibilidade($('.conteudo__materiais'), temMateriais);

    const temProcedimentos = renderizarProcedimentos(animal);
    alternarVisibilidade($('.conteudo__procedimentos'), temProcedimentos);

    const temNunca = Boolean(animal.nuncaFaca?.length);
    if (temNunca) renderizarLista($('.alerta--perigo .alerta__lista'), animal.nuncaFaca);
    alternarVisibilidade($('.alerta--perigo'), temNunca);

    const temInterrompa = Boolean(animal.interrompaSe?.length);
    if (temInterrompa) renderizarLista($('.alerta--atencao .alerta__lista'), animal.interrompaSe);
    alternarVisibilidade($('.alerta--atencao'), temInterrompa);

    // Estados vazios
    const temAlgumConteudo = temMateriais || temProcedimentos || temNunca || temInterrompa;
    alternarVisibilidade($('.conteudo'), temAlgumConteudo);
    alternarVisibilidade($('.conteudo__colunas'), temMateriais || temProcedimentos);
    alternarVisibilidade($('.conteudo__alertas'), temNunca || temInterrompa);
    alternarVisibilidade($('.em-breve'), !temAlgumConteudo && !animal.descricao);
}

// ---------- Menu de animais ----------

const itensMenu = document.querySelectorAll('.animais-menu__item');

function selecionarItem(item) {
    itensMenu.forEach(i => {
        const ativo = i === item;
        i.classList.toggle('ativo', ativo);
        i.setAttribute('aria-pressed', String(ativo));
    });
    carregarAnimal(item.dataset.animal);
}

itensMenu.forEach(item => item.addEventListener('click', () => selecionarItem(item)));

// Setas de rolagem do menu (aparecem só no mobile)
const lista = $('.animais-menu__lista');
const btnPrev = $('.animais-menu__seta--prev');
const btnNext = $('.animais-menu__seta--next');
const SCROLL_PASSO = 150; // px por clique

if (btnPrev && btnNext && lista) {
    btnPrev.addEventListener('click', () => { lista.scrollLeft -= SCROLL_PASSO; });
    btnNext.addEventListener('click', () => { lista.scrollLeft += SCROLL_PASSO; });
}

// Carrega o primeiro animal por padrão
const itemInicial = document.querySelector('.animais-menu__item.ativo') || itensMenu[0];
if (itemInicial) selecionarItem(itemInicial);