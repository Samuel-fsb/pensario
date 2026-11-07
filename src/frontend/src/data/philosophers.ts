import { Philosopher } from '../types/philosopher';

export const PHILOSOPHERS: Philosopher[] = [
  {
    slug: 'socrates',
    name: 'Sócrates',
    shortDescription: 'Conhece-te a ti mesmo',
    portrait: '/assets/philosophers/socrates.jpg',
    whoWas:
      'Filósofo ateniense (470–399 a.C.) que transformou a filosofia em uma ' +
      'investigação prática sobre como devemos viver. Passava seu tempo ' +
      'conversando em praças públicas, interrogando cidadãos, políticos e ' +
      'artesãos sobre conceitos como justiça, coragem e virtude. Não deixou ' +
      'obras escritas; o conhecemos pelos relatos de Platão e Xenofonte.',
    mainIdeas:
      'A importância do autoconhecimento e do cuidado da alma; o método de ' +
      'perguntas e respostas (elenchos) que revela contradições e impulsiona ' +
      'o pensamento; o reconhecimento da própria ignorância como ponto de ' +
      'partida do saber; a ideia de que virtude e conhecimento estão ' +
      'profundamente ligados.',
    whyItMatters:
      'Sócrates continua atual porque nos ensina a não confundir convicção ' +
      'com conhecimento. Seu modo de investigar ajuda a identificar ' +
      'contradições, avaliar argumentos e rever opiniões diante de boas ' +
      'razões. Seu legado é um ideal de coragem intelectual: continuar ' +
      'buscando a verdade mesmo quando isso é desconfortável.',
    tags: [
      'Ética',
      'Autoconhecimento',
      'Maiêutica',
      'Grécia Antiga',
      'Virtude',
    ],
  },
  {
    slug: 'platao',
    name: 'Platão',
    shortDescription: 'A busca pelo bem',
    portrait: '/assets/philosophers/platao.jpg',
    whoWas:
      'Filósofo ateniense (427–347 a.C.), discípulo de Sócrates e mestre de ' +
      'Aristóteles. Fundou em Atenas a Academia, uma das primeiras ' +
      'instituições de ensino superior do mundo grego. Escreveu em forma ' +
      'de diálogo, usando Sócrates como principal interlocutor para explorar ' +
      'problemas como justiça, beleza, conhecimento e a natureza da alma.',
    mainIdeas:
      'A Teoria das Formas: realidades inteligíveis que permitem compreender ' +
      'o que as coisas verdadeiramente são; a distinção entre conhecimento e ' +
      'opinião; a Alegoria da Caverna, que representa o processo de educação ' +
      'e iluminação; e a busca pela organização justa da alma e da cidade.',
    whyItMatters:
      'Platão permanece influente porque colocou questões fundamentais sobre ' +
      'a relação entre aparência e realidade, conhecimento e opinião, ' +
      'indivíduo e sociedade. Seus diálogos mostram que problemas filosóficos ' +
      'importantes raramente se resolvem com respostas rápidas; exigem ' +
      'argumentação, imaginação e disposição para rever as próprias ideias.',
    tags: ['Formas', 'Alegoria da Caverna', 'Justiça', 'Conhecimento', 'Alma'],
  },
  {
    slug: 'aristoteles',
    name: 'Aristóteles',
    shortDescription: 'Conhecimento pela observação',
    portrait: '/assets/philosophers/aristoteles.jpg',
    whoWas:
      'Filósofo nascido em Estagira (384–322 a.C.), aluno de Platão e tutor ' +
      'de Alexandre da Macedônia. Fundou o Liceu em Atenas e investigou ' +
      'lógica, metafísica, biologia, ética, política, retórica e arte. ' +
      'Diferentemente de Platão, buscava compreender as formas das coisas ' +
      'a partir da observação direta do mundo concreto.',
    mainIdeas:
      'A lógica formal e o silogismo como instrumentos de raciocínio válido; ' +
      'as quatro causas para explicar os fenômenos; a ética da eudaimonia ' +
      '(felicidade como florescimento humano); a virtude como justa medida ' +
      'formada pelo hábito; e a amizade como parte essencial de uma vida plena.',
    whyItMatters:
      'Aristóteles une investigação teórica e atenção à experiência. Sua ' +
      'ética mostra que caráter não se constrói apenas com boas intenções: ' +
      'depende de hábitos, escolhas repetidas e julgamento adequado. Suas ' +
      'reflexões sobre política, linguagem e arte seguem presentes em debates ' +
      'contemporâneos.',
    tags: ['Lógica', 'Eudaimonia', 'Virtude', 'Empirismo', 'Metafísica'],
  },
  {
    slug: 'nietzsche',
    name: 'Nietzsche',
    shortDescription: 'Crie seus próprios valores',
    portrait: '/assets/philosophers/nietzsche.jpg',
    whoWas:
      'Friedrich Nietzsche (1844–1900), filósofo e filólogo alemão que ' +
      'combinou filosofia, crítica cultural, psicologia e literatura em ' +
      'aforismos provocadores. Tornou-se professor de filologia clássica ' +
      'na Basileia muito jovem, mas dedicou-se à escrita após problemas de ' +
      'saúde. Não construiu um sistema fechado; investigou a origem, a ' +
      'função e os efeitos de nossos valores sobre a maneira como vivemos.',
    mainIdeas:
      'A crítica à moral tradicional e à genealogia dos valores; a "morte ' +
      'de Deus" como crise cultural; a transvaloração e a criação de novos ' +
      'valores; o além-do-homem como superação de formas de vida guiadas ' +
      'pela aprovação externa; a vontade de potência; o eterno retorno e o ' +
      'amor fati como afirmação integral da existência.',
    whyItMatters:
      'Nietzsche permanece atual porque nos obriga a investigar as origens ' +
      'dos valores que orientam nossas escolhas. Sua crítica pode ajudar a ' +
      'identificar moralismos e padrões culturais aceitos sem reflexão. Sua ' +
      'ênfase na criação e na afirmação da vida levanta uma pergunta ' +
      'exigente: que valores escolheríamos se assumíssemos responsabilidade ' +
      'por nossa própria existência?',
    tags: [
      'Crítica dos Valores',
      'Além-do-homem',
      'Amor Fati',
      'Niilismo',
      'Vontade de Potência',
    ],
  },
];
