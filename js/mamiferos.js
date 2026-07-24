// Dados de cada animal
const animais = {
    coelho: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Contenção para realização de procedimentos",
        materiais: "Materiais.",
        procedimentos: "Procedimento."
    },
    porquinho: {
        descricao: "Teste",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    },
    chinchila: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    },
    hamster: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    },
    twister: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    },
    furao: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    },
    ourico: {
        descricao: "Nesta seção são apresentados conteúdos relacionados às técnicas de contenção física em mamíferos silvestres e exóticos mantidos como pets. Devido às diferenças anatômicas, comportamentais e ao porte corporal das diversas espécies, as estratégias de manejo podem variar significativamente. Assim, são abordadas orientações sobre formas adequadas de contenção, cuidados durante o manuseio e aspectos importantes para reduzir riscos de acidentes e estresse durante os procedimentos clínicos. As informações reunidas buscam auxiliar na compreensão das particularidades desse grupo, contribuindo para um manejo mais seguro e adequado na prática médico-veterinária.",
        video: "../assets/video/coelho.mp4",
        tituloConteudo: "Lista de materiais do coelho...",
        materiais: "Lista de materiais do porquinho...",
        procedimentos: "Passo a passo do procedimento..."
    }
};

// Função que atualiza o conteúdo na tela
function carregarAnimal(nomeAnimal) {
    const animal = animais[nomeAnimal]
    if (!animal) return;

    document.querySelector('.descricao__texto').textContent = animal.descricao;
    document.querySelector('.video-secao__player').src = animal.video;
    document.querySelector('.conteudo__titulo').textContent = animal.tituloConteudo;
    document.querySelector('.conteudo__materiais').textContent = animal.materiais;
    document.querySelector('.conteudo__procedimentos').textContent = animal.procedimentos;
}

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