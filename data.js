// ==================== DATA.JS ====================
// Banco de dados do PromptForge
// Preparado para conexão futura com Google Sheets

// ==================== NICHOS ====================
const NICHOS = [
    { id: 'tennis', name: 'Tênis', icon: '🎾' },
    { id: 'surf', name: 'Surf', icon: '🏄' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'soccer', name: 'Futebol', icon: '⚽' },
    { id: 'skate', name: 'Skate', icon: '🛹' },
    { id: 'music', name: 'Música', icon: '🎸' },
    { id: 'coffee', name: 'Café', icon: '☕' },
    { id: 'beer', name: 'Cerveja', icon: '🍺' },
    { id: 'pets', name: 'Pets', icon: '🐕' },
    { id: 'cats', name: 'Gatos', icon: '🐱' },
    { id: 'travel', name: 'Viagem', icon: '✈️' },
    { id: 'nature', name: 'Natureza', icon: '🌿' },
    { id: 'gaming', name: 'Games', icon: '🎮' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'gospel', name: 'Gospel', icon: '✝️' },
    { id: 'cars', name: 'Carros', icon: '🏎️' },
    { id: 'motos', name: 'Motos', icon: '🏍️' },
    { id: 'bbq', name: 'Churrasco', icon: '🥩' },
    { id: 'fishing', name: 'Pesca', icon: '🎣' },
    { id: 'food', name: 'Gastronomia', icon: '🍕' },
    { id: 'books', name: 'Livros', icon: '📚' },
    { id: 'yoga', name: 'Yoga', icon: '🧘' },
    { id: 'crossfit', name: 'CrossFit', icon: '🏋️' },
    { id: 'zodiac', name: 'Signos', icon: '♌', hasSubmenu: true, submenuType: 'signos' },
    { id: 'jobs', name: 'Profissões', icon: '💼', hasSubmenu: true, submenuType: 'profissoes' },
    { id: 'custom', name: 'Outro', icon: '✨' }
];

// ==================== SUBMENUS ====================
const PROFISSOES = [
    { id: 'jobs_medico', name: 'Médico', icon: '👨‍⚕️' },
    { id: 'jobs_enfermeiro', name: 'Enfermeiro', icon: '👩‍⚕️' },
    { id: 'jobs_dentista', name: 'Dentista', icon: '🦷' },
    { id: 'jobs_chef', name: 'Chef', icon: '👨‍🍳' },
    { id: 'jobs_engenheiro', name: 'Engenheiro', icon: '👷' },
    { id: 'jobs_professor', name: 'Professor', icon: '👨‍🏫' },
    { id: 'jobs_advogado', name: 'Advogado', icon: '👩‍⚖️' },
    { id: 'jobs_bombeiro', name: 'Bombeiro', icon: '👨‍🚒' },
    { id: 'jobs_policial', name: 'Policial', icon: '👮' },
    { id: 'jobs_piloto', name: 'Piloto', icon: '🧑‍✈️' },
    { id: 'jobs_programador', name: 'Programador', icon: '👨‍💻' },
    { id: 'jobs_barbeiro', name: 'Barbeiro', icon: '💇' },
    { id: 'jobs_mecanico', name: 'Mecânico', icon: '👨‍🔧' },
    { id: 'jobs_caminhoneiro', name: 'Caminhoneiro', icon: '🚚' },
    { id: 'jobs_contador', name: 'Contador', icon: '📊' },
    { id: 'jobs_agricultor', name: 'Agricultor', icon: '🧑‍🌾' }
];

const SIGNOS = [
    { id: 'zodiac_aries', name: 'Áries', icon: '♈' },
    { id: 'zodiac_touro', name: 'Touro', icon: '♉' },
    { id: 'zodiac_gemeos', name: 'Gêmeos', icon: '♊' },
    { id: 'zodiac_cancer', name: 'Câncer', icon: '♋' },
    { id: 'zodiac_leao', name: 'Leão', icon: '♌' },
    { id: 'zodiac_virgem', name: 'Virgem', icon: '♍' },
    { id: 'zodiac_libra', name: 'Libra', icon: '♎' },
    { id: 'zodiac_escorpiao', name: 'Escorpião', icon: '♏' },
    { id: 'zodiac_sagitario', name: 'Sagitário', icon: '♐' },
    { id: 'zodiac_capricornio', name: 'Capricórnio', icon: '♑' },
    { id: 'zodiac_aquario', name: 'Aquário', icon: '♒' },
    { id: 'zodiac_peixes', name: 'Peixes', icon: '♓' }
];

// ==================== PALETAS ====================
const PALETAS = [
    { 
        id: 'vibrant', 
        name: 'Vibrante', 
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'], 
        keywords: 'vibrant bold saturated colors, high contrast, eye-catching bright tones, vivid palette'
    },
    { 
        id: 'pastel', 
        name: 'Pastel', 
        colors: ['#FFB5E8', '#B5DEFF', '#BFFCC6'], 
        keywords: 'soft pastel colors, gentle muted tones, light and airy palette, delicate hues'
    },
    { 
        id: 'bw', 
        name: 'P&B', 
        colors: ['#000000', '#666666', '#FFFFFF'], 
        keywords: 'black and white only, monochromatic, high contrast grayscale, no colors'
    },
    { 
        id: 'neon', 
        name: 'Neon', 
        colors: ['#FF00FF', '#00FFFF', '#39FF14'], 
        keywords: 'neon glowing colors, electric bright fluorescent tones, cyberpunk palette, radioactive glow'
    },
    { 
        id: 'earth', 
        name: 'Terroso', 
        colors: ['#8B4513', '#D2691E', '#F5DEB3'], 
        keywords: 'earthy natural tones, warm browns and beiges, organic color palette, terracotta ochre'
    },
    { 
        id: 'ocean', 
        name: 'Oceano', 
        colors: ['#006994', '#40E0D0', '#E0FFFF'], 
        keywords: 'ocean inspired colors, blues and teals, aquatic sea palette, deep water tones'
    },
    { 
        id: 'auto', 
        name: 'IA Decide', 
        colors: ['#00f260', '#0575e6', '#f857a6'], 
        keywords: ''
    }
];

// ==================== ESTILOS ====================
const ESTILOS = [
    {
        id: 'editorial',
        name: 'Editorial Artístico',
        group: 'Em Destaque',
        emoji: '🎨',
        description: 'Estilo minimalista com pinceladas texturizadas, figuras sem rosto, cores vibrantes. Perfeito para designs modernos e sofisticados.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'flat minimalist illustration, artistic editorial style, faceless figures with simple geometric body shapes, thick textured painterly brushstrokes, clean graphic design composition, poster aesthetic, vector-like characters with thin elegant outlines'
    },
    {
        id: 'watercolor',
        name: 'Aquarela',
        group: 'Em Destaque',
        emoji: '💧',
        description: 'Pintura aquarela delicada com cores fluidas e bordas suaves. Artístico e elegante.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'beautiful watercolor painting illustration, soft delicate brushstrokes, paint bleeding effects, artistic color blending, wet on wet technique, organic flowing shapes, hand-painted aesthetic, fine art quality'
    },
    {
        id: 'minimalist',
        name: 'Minimalista',
        group: 'Mais Populares',
        emoji: '◻️',
        description: 'Linhas finas, formas simples, uso inteligente de espaço negativo. Versátil e elegante.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'minimalist geometric graphic design, clean line art illustration, clever use of negative space, thin precise elegant strokes, modern sophisticated design, simple shapes'
    },
    {
        id: 'typography',
        name: 'Tipografia Bold',
        group: 'Mais Populares',
        emoji: '✏️',
        description: 'Foco em lettering criativo e frases impactantes. Campeã de vendas.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'bold typography design, creative lettering layout, dynamic text composition with varying font sizes and weights, impactful statement design, modern editorial typography'
    },
    {
        id: 'vintage',
        name: 'Vintage Retrô',
        group: 'Mais Populares',
        emoji: '📼',
        description: 'Nostalgia anos 70-90, cores quentes, texturas envelhecidas. Atrai público 25-40 anos.',
        modeloLeonardo: 'Vintage Style Photography',
        promptBase: 'retro vintage style graphic, nostalgic 70s 80s 90s aesthetic, warm sepia and faded colors, distressed aged texture, old school vibes, worn paper effect'
    },
    {
        id: 'streetwear',
        name: 'Streetwear Urbano',
        group: 'Mais Populares',
        emoji: '🛹',
        description: 'Graffiti, edgy, agressivo. Público jovem ligado a hip hop e skate culture.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'streetwear urban graphic design, street art graffiti style, dripping paint effects, bold aggressive composition, chrome and shadow details, dark edgy aesthetic, hypebeast culture'
    },
    {
        id: 'anime',
        name: 'Anime / Mangá',
        group: 'Cultura Pop',
        emoji: '🎌',
        description: 'Estética japonesa, personagens expressivos. Muito popular entre jovens.',
        modeloLeonardo: 'Anime Pastel Dream',
        promptBase: 'anime manga style graphic illustration, expressive anime character design, Japanese manga visual effects, speed lines and impact frames, dramatic action pose, vibrant anime colors, shonen style'
    },
    {
        id: 'pixel',
        name: 'Pixel Art',
        group: 'Cultura Pop',
        emoji: '🎮',
        description: '8-bit, arcade nostálgico. Público gamer e millennials.',
        modeloLeonardo: 'Pixel Art',
        promptBase: 'retro pixel art style graphic, 8-bit video game aesthetic, pixelated characters and elements, classic arcade game look, Nintendo NES color palette, nostalgic gaming vibes'
    },
    {
        id: 'meme',
        name: 'Meme / Humor',
        group: 'Cultura Pop',
        emoji: '😂',
        description: 'Cultura de internet, formatos virais, humor instantâneo.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'modern internet meme style graphic, viral humor aesthetic, simple clean design, relatable humor, bold impact font style, internet culture reference'
    },
    {
        id: 'psychedelic',
        name: 'Psicodélico',
        group: 'Artísticos',
        emoji: '🌀',
        description: 'Surreal, trippy, colagens impossíveis. Para festivais e público alternativo.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'psychedelic surreal graphic design, trippy abstract interpretation, Salvador Dali meets pop art, impossible geometry and optical illusions, cosmic space elements, melting and morphing effects'
    },
    {
        id: 'diagram',
        name: 'Diagrama Técnico',
        group: 'Artísticos',
        emoji: '📐',
        description: 'Blueprint, patente falsa, specs de engenharia. Humor inteligente para nerds.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'technical blueprint diagram style, engineering schematic, fake patent drawing with measurements and annotations, technical specifications, white lines on navy blue background'
    },
    {
        id: 'neon',
        name: 'Neon Glow',
        group: 'Artísticos',
        emoji: '💡',
        description: 'Luzes neon brilhantes, cyberpunk vibes, night city aesthetic.',
        modeloLeonardo: 'Leonardo Diffusion XL',
        promptBase: 'neon glow graphic design, bright neon tubes effect, cyberpunk aesthetic, night city vibes, glowing light effects, synthwave influence, dark background with bright elements'
    }
];

// ==================== NICHO KEYWORDS ====================
const NICHO_KEYWORDS = {
    tennis: 'tennis, racket, tennis ball, court, tennis player, grand slam',
    surf: 'surfing, surfboard, wave, ocean, beach, surfer, barrel wave',
    fitness: 'gym, workout, weights, muscles, training, athlete, fitness',
    soccer: 'football, soccer ball, goal, stadium, player, championship',
    skate: 'skateboard, skating, tricks, street, urban, halfpipe, ollie',
    music: 'guitar, music, rock, concert, band, musician, vinyl record',
    coffee: 'coffee, espresso, beans, cafe, barista, cup, latte art',
    beer: 'beer, craft beer, brewery, hops, pub, cheers, pint glass',
    pets: 'dog, puppy, pet, cute animal, loyal companion, paw print',
    cats: 'cat, kitten, feline, cute cat, whiskers, meow, cat lover',
    travel: 'travel, adventure, wanderlust, explore, destination, passport',
    nature: 'nature, mountains, forest, outdoor, wilderness, hiking',
    gaming: 'video game, controller, gamer, esports, console, arcade',
    tech: 'technology, coding, computer, digital, innovation, programming',
    gospel: 'christian, faith, cross, jesus, spiritual, bible, religious, god',
    cars: 'car, automobile, racing, sports car, engine, speed, horsepower',
    motos: 'motorcycle, biker, chopper, racing bike, rider, harley',
    bbq: 'barbecue, grill, meat, steak, fire, cooking, smoke, ribs',
    fishing: 'fishing, fish, rod, lake, river, angler, bass, catch',
    food: 'food, cooking, chef, cuisine, gourmet, restaurant, delicious',
    books: 'books, reading, literature, library, writer, novel, bookworm',
    yoga: 'yoga, meditation, zen, mindfulness, wellness, balance, namaste',
    crossfit: 'crossfit, wod, functional training, athlete, box, burpee',
    zodiac: 'zodiac, astrology, horoscope, constellation, stars, celestial',
    jobs: 'profession, work, career, occupation, professional, job',
    custom: '',
    // Profissões específicas
    jobs_medico: 'doctor, physician, medical, stethoscope, hospital, healthcare',
    jobs_enfermeiro: 'nurse, nursing, healthcare, hospital, care, medical',
    jobs_dentista: 'dentist, dental, teeth, smile, oral health, tooth',
    jobs_chef: 'chef, cooking, kitchen, culinary, restaurant, gourmet, knife',
    jobs_engenheiro: 'engineer, engineering, construction, building, project, helmet',
    jobs_professor: 'teacher, education, school, classroom, knowledge, teaching',
    jobs_advogado: 'lawyer, attorney, law, justice, court, legal, scales',
    jobs_bombeiro: 'firefighter, fire, rescue, hero, emergency, brave',
    jobs_policial: 'police, cop, officer, law enforcement, badge, protect',
    jobs_piloto: 'pilot, aviation, airplane, flying, cockpit, captain',
    jobs_programador: 'programmer, coding, developer, software, computer, code',
    jobs_barbeiro: 'barber, haircut, grooming, scissors, razor, barbershop',
    jobs_mecanico: 'mechanic, automotive, repair, tools, garage, engine',
    jobs_caminhoneiro: 'trucker, truck driver, highway, road, cargo, diesel',
    jobs_contador: 'accountant, finance, numbers, calculator, taxes, business',
    jobs_agricultor: 'farmer, agriculture, farm, harvest, tractor, crops',
    // Signos específicos
    zodiac_aries: 'aries, ram, fire sign, mars, zodiac aries symbol, horns',
    zodiac_touro: 'taurus, bull, earth sign, venus, zodiac taurus symbol',
    zodiac_gemeos: 'gemini, twins, air sign, mercury, zodiac gemini symbol',
    zodiac_cancer: 'cancer, crab, water sign, moon, zodiac cancer symbol',
    zodiac_leao: 'leo, lion, fire sign, sun, zodiac leo symbol, mane',
    zodiac_virgem: 'virgo, maiden, earth sign, mercury, zodiac virgo symbol',
    zodiac_libra: 'libra, scales, air sign, venus, zodiac libra symbol, balance',
    zodiac_escorpiao: 'scorpio, scorpion, water sign, pluto, zodiac scorpio symbol',
    zodiac_sagitario: 'sagittarius, archer, fire sign, jupiter, zodiac sagittarius symbol, arrow',
    zodiac_capricornio: 'capricorn, goat, earth sign, saturn, zodiac capricorn symbol',
    zodiac_aquario: 'aquarius, water bearer, air sign, uranus, zodiac aquarius symbol',
    zodiac_peixes: 'pisces, fish, water sign, neptune, zodiac pisces symbol'
};

// ==================== DICAS POR NICHO ====================
const DICAS_NICHO = {
    tennis: '💡 Estampas de tênis vendem bem com silhuetas de jogadores em ação, raquetes estilizadas e frases motivacionais como "Game, Set, Match".',
    surf: '💡 Ondas, pranchas e pôr do sol são clássicos. Frases como "Salt Life" e "Ocean Lover" fazem sucesso.',
    fitness: '💡 Músculos estilizados, pesos e frases motivacionais como "No Pain No Gain" são campeões de vendas.',
    soccer: '💡 Silhuetas de jogadores, bolas em chamas e escudos estilizados atraem o público apaixonado.',
    skate: '💡 Caveiras, shapes quebrados e estética urbana grunge funcionam muito bem.',
    music: '💡 Guitarras, notas musicais e referências a gêneros específicos (rock, jazz) vendem bem.',
    coffee: '💡 Xícaras fumegantes, grãos e frases como "But First, Coffee" são bestsellers.',
    beer: '💡 Canecas, lúpulo e frases engraçadas sobre cerveja têm ótima aceitação.',
    pets: '💡 Raças específicas de cães vendem muito. Golden, Bulldog e Labrador lideram.',
    cats: '💡 Gatos com atitude, referências a "cat lady" e humor felino têm grande público.',
    travel: '💡 Aviões, mapas e monumentos famosos combinados com frases wanderlust funcionam.',
    nature: '💡 Montanhas, florestas e silhuetas de aventureiros atraem o público outdoor.',
    gaming: '💡 Referências a jogos clássicos, controles e frases como "Game Over" são populares.',
    tech: '💡 Código binário, circuitos e humor nerd conquistam programadores.',
    gospel: '💡 Cruzes estilizadas, versículos bíblicos e símbolos de fé têm público fiel.',
    cars: '💡 Silhuetas de carros clássicos, velocímetros e motores fazem sucesso.',
    motos: '💡 Motores, caveiras de motociclista e frases de liberdade vendem bem.',
    bbq: '💡 Churrasqueiras, cortes de carne e frases sobre "mestre do churrasco" são populares.',
    fishing: '💡 Peixes grandes, anzóis e frases sobre pesca "Fishing is my therapy" funcionam.',
    food: '💡 Ilustrações de pratos específicos e frases foodie atraem apaixonados por gastronomia.',
    books: '💡 Pilhas de livros, óculos e frases sobre leitura conquistam biblióficos.',
    yoga: '💡 Poses de yoga estilizadas, mandalas e frases zen têm público fiel.',
    crossfit: '💡 Kettlebells, barras e frases motivacionais intensas funcionam muito.',
    zodiac: '💡 Constelações, símbolos místicos e características de cada signo vendem muito.',
    jobs: '💡 Ferramentas da profissão e frases de orgulho profissional são bestsellers.',
    custom: '💡 Descreva sua ideia com detalhes. Quanto mais específico, melhor o resultado!'
};

// ==================== CATEGORIAS DE IDEIAS ====================
const CATEGORIAS = [
    { id: 'acao', name: 'Ação', icon: '🏃' },
    { id: 'equipamento', name: 'Equipamento', icon: '🎒' },
    { id: 'humor', name: 'Humor', icon: '😄' },
    { id: 'icones', name: 'Ícones', icon: '⭐' },
    { id: 'frases', name: 'Frases', icon: '✏️' },
    { id: 'arte', name: 'Arte', icon: '🎨' }
];

// ==================== BANCO DE IDEIAS (Exemplo) ====================
// Estrutura preparada para expansão e conexão com Google Sheets
const BANCO_IDEIAS = {
    tennis: {
        acao: [
            "Jogador executando saque potente com explosão de energia",
            "Backhand em câmera lenta com respingos de suor",
            "Mergulho dramático para alcançar a bola",
            "Jogador celebrando vitória com raquete erguida",
            "Voleio perfeito na rede com expressão de foco"
        ],
        equipamento: [
            "Raquete vintage de madeira com bolas antigas",
            "Bola de tênis gigante em close com texturas detalhadas",
            "Raquete moderna com cordas brilhando como raios",
            "Coleção de raquetes através das décadas",
            "Sapatilha de tênis clássica com quadra de saibro"
        ],
        humor: [
            "Gato tentando jogar tênis com expressão confusa",
            "Bola de tênis como planeta sendo orbitado por raquetes",
            "Jogador dormindo na quadra com despertador de bola",
            "Cachorro golden retriever como juiz de linha",
            "Raquete como guitarra em pose de rock star"
        ],
        icones: [
            "Silhueta icônica de saque estilo campeão",
            "Troféu de Wimbledon com grama e morangos",
            "Quadra vista de cima formando coração",
            "Bola de tênis com coroa de campeão",
            "Rede de tênis formando asas de anjo"
        ],
        frases: [
            "Game. Set. Match. - tipografia bold agressiva",
            "Eat. Sleep. Tennis. Repeat. - estilo minimalista",
            "Love means nothing in tennis - design romântico",
            "Tennis is my therapy - com silhueta meditando",
            "Deuce! - estilo retrô anos 80"
        ],
        arte: [
            "Bola de tênis derretendo estilo Dalí",
            "Quadra de tênis em paisagem surreal flutuante",
            "Raquete formada por notas musicais",
            "Jogador feito de formas geométricas abstratas",
            "Tênis e natureza - raquete com folhas crescendo"
        ]
    },
    surf: {
        acao: [
            "Surfista pegando onda gigante em tubo perfeito",
            "Manobra aérea com spray de água congelado",
            "Drop em onda enorme com expressão de adrenalina",
            "Surfista ao pôr do sol em silhueta dourada",
            "Wipeout dramático com surfista sendo engolido pela onda"
        ],
        equipamento: [
            "Prancha vintage de madeira com wax derretendo",
            "Coleção de pranchas coloridas na areia",
            "Quilhas como barbatanas de tubarão",
            "Leash esticado com prancha voando",
            "Prancha fincada na areia com pôr do sol"
        ],
        humor: [
            "Tubarão surfando melhor que humano",
            "Gato em prancha com cara de pânico",
            "Surfista de terno e gravata pegando onda",
            "Onda gigante de café com surfista",
            "Pinguim dando aula de surf"
        ],
        icones: [
            "Onda de Hokusai com surfista moderno",
            "Prancha com mapa mundi dos melhores picos",
            "Shaka sign gigante dourado",
            "Kombi vintage com pranchas no teto",
            "Farol com onda quebrando ao redor"
        ],
        frases: [
            "Salt Life - com onda estilizada",
            "Ocean State of Mind - tipografia aquática",
            "Surf More, Worry Less - design relaxado",
            "High Tides, Good Vibes - estilo tropical",
            "Born to Surf - com prancha vintage"
        ],
        arte: [
            "Onda formada por peixes coloridos",
            "Surfista em dimensão paralela surreal",
            "Prancha como portal para outro mundo",
            "Mar geométrico estilo low-poly",
            "Surfista feito de água transparente"
        ]
    },
    coffee: {
        acao: [
            "Barista fazendo latte art em câmera lenta",
            "Café sendo despejado em slow motion",
            "Mãos aquecendo na xícara fumegante",
            "Grãos de café caindo como chuva",
            "Primeiro gole da manhã com expressão de prazer"
        ],
        equipamento: [
            "Máquina de espresso vintage italiana",
            "Xícara de porcelana com design ornamentado",
            "Moedor manual antigo de bronze",
            "Chemex com luz atravessando o café",
            "Prensa francesa em close detalhado"
        ],
        humor: [
            "Xícara de café como Super-herói salvador",
            "Gato dentro de xícara de café gigante",
            "Café como combustível com medidor de energia",
            "Zumbi antes e depois do café",
            "Diagrama científico 'Anatomia do viciado em café'"
        ],
        icones: [
            "Xícara formando coração com fumaça",
            "Grãos de café formando mapa do Brasil",
            "Café da manhã perfeito em estilo flat",
            "Xícara com asas de anjo",
            "Termômetro de humor baseado em café"
        ],
        frases: [
            "But First, Coffee - tipografia elegante",
            "Coffee is my love language - romântico",
            "Death before decaf - estilo hardcore",
            "Powered by coffee - design tech",
            "Espresso yourself - com xícara expressiva"
        ],
        arte: [
            "Galáxia dentro de uma xícara de café",
            "Cidade inteira emergindo da fumaça do café",
            "Café derramando criando obra de arte",
            "Xícara em estilo art nouveau detalhado",
            "Café como portal dimensional místico"
        ]
    },
    // Estrutura para outros nichos (serão expandidos)
    fitness: {
        acao: ["Atleta levantando peso com expressão de força", "Corredor cruzando linha de chegada", "Flexão explosiva com gotículas de suor", "Salto box jump no auge", "Agachamento profundo com barra olímpica"],
        equipamento: ["Halteres cruzados como brasão", "Corda de pular em movimento", "Kettlebell com chamas", "Luvas de treino gastas", "Barra olímpica dobrada de força"],
        humor: ["Frango querendo ficar musculoso", "Antes e depois: sofá vs academia", "Músculo bíceps com cara de bravo", "Academia traduzida para preguiçosos", "Segunda-feira skip leg day"],
        icones: ["Silhueta de fisiculturista clássico", "Coração formado por halteres", "Troféu de campeão bodybuilding", "Logo de academia vintage", "Punho cerrado de determinação"],
        frases: ["No Pain No Gain - estilo rasgado", "Beast Mode ON - agressivo", "Eat Clean Train Dirty - dividido", "Gym Hair Don't Care - divertido", "Strong is the new sexy - elegante"],
        arte: ["Corpo humano feito de engrenagens", "Músculos em estilo anatômico vintage", "Atleta geométrico abstrato", "Explosão de energia saindo do corpo", "Transformação física em fases artísticas"]
    },
    gospel: {
        acao: ["Mãos erguidas em adoração", "Pessoa ajoelhada em oração", "Pomba descendo com luz divina", "Batismo nas águas", "Pregador com bíblia aberta"],
        equipamento: ["Bíblia antiga com luz emanando", "Cruz de madeira rústica", "Cálice e pão da comunhão", "Terço com crucifixo detalhado", "Harpa celestial dourada"],
        humor: ["Café e fé - a combinação perfeita", "Jesus é meu GPS - não me perco", "Plantão de oração 24h", "WiFi do céu - senha: fé", "Personal trainer: Deus"],
        icones: ["Cruz estilizada moderna", "Peixe ichthys contemporâneo", "Coroa de espinhos com flores", "Leão de Judá majestoso", "Cordeiro com bandeira"],
        frases: ["Fé em Deus - tipografia elegante", "Não por força, mas pelo Espírito", "Tudo posso naquele que me fortalece", "Deus é bom o tempo todo", "Sou mais que vencedor"],
        arte: ["Vitral de igreja estilizado", "Anjo em estilo contemporâneo", "Luz divina atravessando nuvens", "Escada para o céu abstrata", "Mãos de Deus criando - Michelangelo moderno"]
    }
};

// ==================== PROMPT SUFFIX (para estampas) ====================
const PROMPT_SUFFIX = {
    universal: "t-shirt graphic design, print-ready artwork, clean sharp edges for easy cutting, isolated on solid background, high contrast, DTF DTG sublimation ready, 4000px resolution, no mockup, no t-shirt, just the graphic element",
    leonardo: "highly detailed, professional quality",
    midjourney: "--no mockup, t-shirt, clothing, realistic photo, person",
    gemini: "Arte pronta para estampa de camiseta, com bordas limpas para recorte. Fundo sólido. Alta resolução."
};

// ==================== NEGATIVE PROMPT ====================
const NEGATIVE_PROMPT = "blurry, low quality, distorted, deformed, ugly, bad anatomy, watermark, signature, text overlay, logo, mockup, t-shirt, clothing, fabric texture, wrinkles, person wearing shirt, model, photorealistic photograph of person wearing, bad proportions, extra limbs, mutated, disfigured, out of frame, cropped, amateur, jpeg artifacts";

// ==================== AI RECOMMENDATIONS ====================
const AI_RECOMMENDATIONS = {
    editorial: { best: 'leonardo', reason: 'Editorial funciona perfeitamente no Leonardo com o modelo Diffusion XL' },
    watercolor: { best: 'leonardo', reason: 'Aquarela fica incrível no Leonardo com texturas realistas' },
    minimalist: { best: 'midjourney', reason: 'Midjourney é excelente para designs minimalistas e limpos' },
    typography: { best: 'midjourney', reason: 'Tipografia bold fica perfeita no Midjourney v6' },
    vintage: { best: 'leonardo', reason: 'Use o modelo Vintage Style no Leonardo para resultado autêntico' },
    streetwear: { best: 'midjourney', reason: 'Streetwear com estilo raw do Midjourney fica agressivo' },
    anime: { best: 'leonardo', reason: 'Use Anime Pastel Dream no Leonardo para estilo autêntico' },
    pixel: { best: 'leonardo', reason: 'Leonardo tem modelo específico de Pixel Art' },
    meme: { best: 'gemini', reason: 'Gemini entende melhor contexto de humor e memes brasileiros' },
    psychedelic: { best: 'midjourney', reason: 'Midjourney cria psicodélicos surreais impressionantes' },
    diagram: { best: 'midjourney', reason: 'Diagramas técnicos ficam precisos no Midjourney' },
    neon: { best: 'leonardo', reason: 'Leonardo renderiza efeitos de luz neon muito bem' }
};

// ==================== CONFIGURAÇÃO GOOGLE SHEETS ====================
// Cole aqui o ID da sua planilha quando configurar
// ==================== CONFIGURAÇÃO GOOGLE SHEETS ====================
// ==================== CONFIGURAÇÃO GOOGLE SHEETS ====================
const GOOGLE_SHEETS_CONFIG = {
    enabled: true,
    webAppUrl: 'https://script.google.com/macros/s/AKfycbwdQRWNtAydhEjuGlBB_-p0jd3qWbl8FbjBVSvKFI15EnRDTLjIsENGHaSTD3mdVTPp/exec'
};
// ==================== FUNÇÃO PARA CARREGAR DADOS EXTERNOS ====================
async function carregarDadosExternos() {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('📦 Usando banco de dados local');
        return BANCO_IDEIAS;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl);
        
        if (!response.ok) {
            throw new Error('Falha na resposta');
        }
        
        const jsonData = await response.json();
        
        // Converte array para estrutura do app
        const dados = {};
        
        jsonData.forEach(item => {
            const { nicho, categoria, ideia } = item;
            
            if (nicho && categoria && ideia) {
                if (!dados[nicho]) dados[nicho] = {};
                if (!dados[nicho][categoria]) dados[nicho][categoria] = [];
                dados[nicho][categoria].push(ideia);
            }
        });
        
        // Conta total
        const totalIdeias = jsonData.length;
        
        if (totalIdeias > 0) {
            console.log(`☁️ Dados carregados do Google Sheets (${totalIdeias} ideias)`);
            // MUDANÇA: Retorna SÓ os dados da planilha, não mescla
            return dados;
        } else {
            console.warn('⚠️ Planilha vazia, usando backup local');
            return BANCO_IDEIAS;
        }
        
    } catch (error) {
        console.warn('⚠️ Falha ao carregar dados externos, usando backup local');
        console.warn('Detalhe:', error.message);
        return BANCO_IDEIAS;
    }
}