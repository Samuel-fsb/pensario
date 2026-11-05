import { Philosopher } from '../types/philosopher';

export const PHILOSOPHERS: Philosopher[] = [
  {
    slug: 'socrates',
    name: 'Sócrates',
    shortDescription: 'Ética • Autoconhecimento',
    portrait: '/assets/philosophers/socrates.png',
    whoWas:
      'Filósofo grego (470–399 a.C.), considerado o pai da filosofia ' +
      'ocidental. Foi um mestre na arte do diálogo e na busca pela verdade.',
    mainIdeas:
      'A importância do autoconhecimento, da ética e do questionamento ' +
      'constante das próprias crenças.',
    whyItMatters:
      'Suas ideias nos lembram da importância de pensar, questionar e ' +
      'viver de forma virtuosa.',
    tags: [
      'Ética',
      'Autoconhecimento',
      'Maiêutica',
      'Grécia Antiga',
      'Verdade',
    ],
  },
  {
    slug: 'platao',
    name: 'Platão',
    shortDescription: 'Ideias • Conhecimento',
    portrait: '/assets/philosophers/platao.png',
    whoWas:
      'Discípulo de Sócrates e fundador da Academia em Atenas ' +
      '(428–348 a.C.), uma das primeiras instituições de ensino ' +
      'superior do Ocidente.',
    mainIdeas:
      'A Teoria das Ideias (o mundo sensível como sombra do mundo ' +
      'inteligível), a Alegoria da Caverna e a busca pela justiça.',
    whyItMatters:
      'Provocou uma revolução no modo como entendemos a realidade, ' +
      'convidando-nos a não aceitar ilusões e a buscar a essência das coisas.',
    tags: ['Ideias', 'Conhecimento', 'Mito da Caverna', 'Justiça', 'Idealismo'],
  },
  {
    slug: 'aristoteles',
    name: 'Aristóteles',
    shortDescription: 'Lógica • Virtude',
    portrait: '/assets/philosophers/aristoteles.png',
    whoWas:
      'Filósofo grego (384–322 a.C.), aluno de Platão e preceptor de ' +
      'Alexandre, o Grande. Fundador do Liceu e sistematizador do ' +
      'conhecimento antigo.',
    mainIdeas:
      'A busca pela excelência moral como justa medida (equilíbrio), ' +
      'a lógica formal e a observação empírica da natureza.',
    whyItMatters:
      'Oferece uma sabedoria prática e fundamentada: ser feliz consiste ' +
      'em cultivar hábitos virtuosos e agir com sabedoria no cotidiano.',
    tags: ['Lógica', 'Virtude', 'Ética', 'Eudaimonia', 'Empirismo'],
  },
  {
    slug: 'nietzsche',
    name: 'Nietzsche',
    shortDescription: 'Vontade • Além-do-homem',
    portrait: '/assets/philosophers/nietzsche.png',
    whoWas:
      'Friedrich Nietzsche (1844–1900), filósofo e filólogo alemão ' +
      'conhecido por seu pensamento provocativo, poético e libertador.',
    mainIdeas:
      'A Vontade de Poder, a transvaloração dos valores tradicionais, ' +
      'o Além-do-homem (Übermensch) e o Amor Fati ' +
      '(amor ao próprio destino).',
    whyItMatters:
      'Desperta a coragem de forjar os próprios valores, afirmando a ' +
      'vida com todas as suas dores e belezas sem depender de dogmas.',
    tags: [
      'Vontade',
      'Super-homem',
      'Além-do-homem',
      'Amor Fati',
      'Existencialismo',
    ],
  },
];
