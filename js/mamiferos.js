// Dados de cada animal
const animais = {
    coelho: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "https://youtu.be/Fbiwf07K5oY?si=Fvq7Xgyfx7fNi0Hm",
        tituloConteudo: "Contenção para realização de procedimentos",
        materiais: [
            {
                titulo: "Lista de materiais para contenção",
                descricao: "Itens necessários antes de iniciar o procedimento.",
                pdf: "../assets/docs/materiais-coelho.pdf"
            },
            {
                titulo: "Protocolo de biossegurança",
                descricao: "Cuidados de higiene e EPI recomendados.",
                pdf: "../assets/docs/protocolo-coelho.pdf"
            }
        ],
        procedimentos: [
            {
                titulo: "Lista de procedimentos",
                descricao: "Itens necessários antes de iniciar",
                pdf: "../assets/docs/materiais-coelho.pdf"
            }
        ],
    },
    porquinho: {
        descricao: "Teste",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    },
    chinchila: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    },
    hamster: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    },
    twister: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    },
    furao: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    },
    ourico: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: [],
        procedimentos: "Passo a passo do procedimento..."
    }
};

// Renderiza a lista de materiais (PDFs) do animal atual
function renderizarMateriais(lista) {
    const container = document.querySelector('.conteudo__materiais-lista');
    container.innerHTML = '';

    if (!lista || lista.length === 0) {
        container.innerHTML = '<li class="conteudo__materiais-vazio">Nenhum material disponível para este animal.</li>';
        return;
    }

    lista.forEach(item => {
        const li = document.createElement('li');
        li.className = 'conteudo__materiais-item';
        li.innerHTML = `
            <a href="#" class="conteudo__materiais-link"
               data-bs-toggle="modal" data-bs-target="#modalPdf"
               data-pdf="${item.pdf}" data-titulo="${item.titulo}">
                ${item.titulo}
            </a>
            <p class="conteudo__materiais-descricao">${item.descricao}</p>
        `;
        container.appendChild(li);
    });
}

// Renderiza a lista de procedimentos (PDFs) do animal atual
function renderizarProcedimentos(lista) {
    const container = document.querySelector('.conteudo__procedimentos-lista');
    container.innerHTML = '';

    if (!lista || lista.length === 0) {
        container.innerHTML = '<li class="conteudo__procedimentos-vazio">Nenhum procedimento disponível para este animal.</li>';
        return;
    }

    lista.forEach(item => {
        const li = document.createElement('li');
        li.className = 'conteudo__procedimentos-lista';
        li.innerHTML = `
            <a href="#" class="conteudo__procedimentos-link"
               data-bs-toggle="modal" data-bs-target="#modalPdf"
               data-pdf="${item.pdf}" data-titulo="${item.titulo}">
                ${item.titulo}
            </a>
            <p class="conteudo__procedimentos-descricao">${item.descricao}</p>
        `;
        container.appendChild(li);
    });
}

// Função para converter qualquer formato de link do Youtube
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

// Função que atualiza o conteúdo na tela
function carregarAnimal(nomeAnimal) {
    const animal = animais[nomeAnimal]
    if (!animal) return;

    document.querySelector('.descricao__texto').textContent = animal.descricao;
    document.querySelector('.conteudo__titulo').textContent = animal.tituloConteudo;

    renderizarMateriais(animal.materiais);
    renderizarProcedimentos(animal.procedimentos);

    const player = document.querySelector('.video-secao__player');
    const embedUrl = paraEmbedYoutube(animal.video);
    player.src = embedUrl || animal.video; // se não for link do YouTube, usa a URL original (ex: .mp4)
}

// Escuta o momento em que o modal está prestes a abrir
document.addEventListener('show.bs.modal', (event) => {
    if (event.target.id !== 'modalPdf') return;

    const link = event.relatedTarget; // <a> que disparou o modal
    if (!link) return;

    const pdfUrl = link.dataset.pdf;
    const titulo = link.dataset.titulo;

    document.querySelector('.modal-pdf__viewer').src = pdfUrl;
    document.querySelector('.modal-pdf__download').href = pdfUrl;
    document.getElementById('modalPdfLabel').textContent = titulo;
});

// Evento de clique nas abas
document.querySelectorAll('.animais-menu__item').forEach(item => {
    item.addEventListener('click', () => {

        //Remove "ativo" de todos
        document.querySelectorAll('.animais-menu__item').forEach(i => i.classList.remove('ativo'));

        //Adiciona "ativo" no clicado
        item.classList.add('ativo');

        //Carrega o conteúdo do animal
        carregarAnimal(item.dataset.animal)
    });
});

//Carrega o primeiro animal por padrão
carregarAnimal('coelho')
    
// ----------------------------------------------------------- //

// Setas do menu de animais
const lista = document.querySelector('.animais-menu__lista');
const btnPrev = document.querySelector('.animais-menu__seta--prev');
const btnNext = document.querySelector('.animais-menu__seta--next');

// Quanto desloca por clique (em px)
const SCROLL_PASSO = 150;

if (btnPrev && btnNext && lista) {
    btnPrev.addEventListener('click', () => {
        lista.scrollLeft -= SCROLL_PASSO;
    });

    btnNext.addEventListener('click', () => {
        lista.scrollLeft += SCROLL_PASSO;
    });
}