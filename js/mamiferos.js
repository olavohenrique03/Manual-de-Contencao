// Dados do grupo Mamíferos.
// Só dados aqui: a renderização fica em js/especies.js (reaproveitável nas outras páginas).
// Campos ausentes são simplesmente omitidos na tela — preencha aos poucos.

window.ESPECIES_DADOS = {
    coelho: {
        nome: "Coelho",
        nomeCientifico: "Oryctolagus cuniculus",
        classificacao: "Ordem Lagomorpha · família Leporidae · peso adulto variável conforme a raça.",
        descricao: "Herbívoro com comportamento de presa e respostas intensas de fuga. O esqueleto é leve (7 a 8% da massa corporal) e os membros pélvicos são muito fortes: um movimento brusco de extensão, sobretudo com a pelve sem apoio, pode fraturar a coluna lombossacral. A respiração é predominantemente nasal e o estresse pode levar à estase gastrointestinal.",
        video: "https://youtu.be/Fbiwf07K5oY?si=Fvq7Xgyfx7fNi0Hm",
        tituloConteudo: "Contenção para realização de procedimentos",

        materiais: [
            "Tapete emborrachado ou toalha antiderrapante",
            "Toalha macia",
            "Caixa de transporte"
        ],

        antesDeConter: "Observe o coelho ainda na caixa de transporte (alerta, respiração, postura) e deixe-o sair sozinho, sem perseguir. Aproxime-se devagar, pela lateral, sobre superfície estável.",

        tecnica: {
            titulo: "Técnica principal: Apoio de tórax e pelve",
            indicacao: "Indicada para exame físico, manejo clínico breve e deslocamentos curtos.",
            passos: [
                { titulo: "Estabilize", descricao: "Uma mão envolve o tórax logo atrás dos membros torácicos, controlando-os sem comprimir." },
                { titulo: "Sustente",   descricao: "A outra mão apoia toda a pelve e os membros posteriores, com a coluna alinhada, antes de qualquer elevação." },
                { titulo: "Eleve",      descricao: "Levante de forma controlada e mantenha o animal junto ao seu corpo." },
                { titulo: "Finalize",   descricao: "Retorne o coelho à superfície e libere-o aos poucos, depois de garantir apoio dos quatro membros." }
            ],
            porque: "A força dos posteriores somada à fragilidade da coluna favorece lesões nos movimentos bruscos de extensão. O suporte simultâneo de tórax e pelve dá estabilidade e reduz o risco de trauma."
        },

        alternativas: [
            "Toalha macia e frouxa, para procedimentos breves, com a cabeça livre e a região posterior apoiada (interrompa se houver intolerância).",
            "Contenção manual sobre superfície antiderrapante, para avaliações sem elevação.",
            "Exame parcial dentro da caixa."
        ],

        nuncaFaca: [
            "Suspender pelas orelhas, membros, cauda ou só pela pele da nuca.",
            "Deixar a região posterior sem sustentação ao elevar.",
            "Apertar de modo que atrapalhe a respiração.",
            "Usar a imobilidade tônica como técnica de rotina."
        ],

        interrompaSe: [
            "Taquipneia acentuada",
            "Vocalização",
            "Cianose",
            "Exaustão",
            "Movimentos violentos de fuga",
            "Suspeita de lesão"
        ]
    },

    // Espécies ainda sem conteúdo: a chave precisa bater com o data-animal do menu.
    porquinho:            { nome: "Porquinho-da-Índia" },
    chinchila:            { nome: "Chinchila" },
    hamster:              { nome: "Hamster" },
    "hamster-anao-russo": { nome: "Hamster anão russo" },
    camundongo:           { nome: "Camundongo" },
    "rato-twister":       { nome: "Rato Twister" },
    gerbil:               { nome: "Gerbil" },
    ourico:               { nome: "Ouriço-pigmeu-africano" },
    furao:                { nome: "Furão" }
};