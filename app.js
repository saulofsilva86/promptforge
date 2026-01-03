// ==================== APP.JS ====================
// PromptForge - Lógica Principal

// ==================== ESTADO GLOBAL ====================
let state = {
    selectedNicho: null,
    selectedNichoName: '',
    selectedNichoIcon: '',
    selectedPaleta: null,
    selectedStyle: null,
    selectedCategoria: null,
    currentPrompts: {
        leonardo: '',
        midjourney: '',
        gemini: ''
    },
    advancedMode: false,
    bancoIdeias: BANCO_IDEIAS,
    historico: [],
    favoritos: [],
    promptCount: 0
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 PromptForge iniciando...');
    
    // Carregar dados do localStorage
    carregarDadosLocais();
    
    // Tentar carregar dados externos (Google Sheets)
    state.bancoIdeias = await carregarDadosExternos();
    
    // Renderizar componentes
    renderNichos();
    renderPaletas();
    renderEstilos();
    renderCategorias();
    renderProfissoes();
    renderSignos();
    
    // Configurar eventos
    setupEventListeners();
    
    // Atualizar contador
    atualizarContador();
    
    console.log('✅ PromptForge pronto!');
});

// ==================== CARREGAR DADOS LOCAIS ====================
function carregarDadosLocais() {
    try {
        // Histórico
        const historicoSalvo = localStorage.getItem('promptforge_historico');
        if (historicoSalvo) {
            state.historico = JSON.parse(historicoSalvo);
        }
        
        // Favoritos
        const favoritosSalvos = localStorage.getItem('promptforge_favoritos');
        if (favoritosSalvos) {
            state.favoritos = JSON.parse(favoritosSalvos);
        }
        
        // Contador
        const contadorSalvo = localStorage.getItem('promptforge_count');
        if (contadorSalvo) {
            state.promptCount = parseInt(contadorSalvo);
        }
        
        // Tema
        const temaSalvo = localStorage.getItem('promptforge_theme');
        if (temaSalvo) {
            document.documentElement.setAttribute('data-theme', temaSalvo);
        }
        
    } catch (error) {
        console.warn('⚠️ Erro ao carregar dados locais:', error);
    }
}

// ==================== SALVAR DADOS LOCAIS ====================
function salvarDadosLocais() {
    try {
        localStorage.setItem('promptforge_historico', JSON.stringify(state.historico));
        localStorage.setItem('promptforge_favoritos', JSON.stringify(state.favoritos));
        localStorage.setItem('promptforge_count', state.promptCount.toString());
    } catch (error) {
        console.warn('⚠️ Erro ao salvar dados locais:', error);
    }
}

// ==================== RENDERIZAÇÃO ====================

function renderNichos() {
    const grid = document.getElementById('nichoGrid');
    if (!grid) return;
    
    grid.innerHTML = NICHOS.map(nicho => `
        <div class="nicho-pill" 
             data-id="${nicho.id}" 
             data-name="${nicho.name}"
             data-icon="${nicho.icon}"
             data-submenu="${nicho.hasSubmenu ? nicho.submenuType : ''}"
             onclick="selecionarNicho('${nicho.id}', '${nicho.name}', '${nicho.icon}', ${nicho.hasSubmenu || false}, '${nicho.submenuType || ''}')">
            <span class="icon">${nicho.icon}</span>
            <span class="name">${nicho.name}</span>
        </div>
    `).join('');
}

function renderPaletas() {
    const grid = document.getElementById('paletaGrid');
    if (!grid) return;
    
    grid.innerHTML = PALETAS.map(paleta => `
        <div class="paleta-pill" 
             data-id="${paleta.id}"
             onclick="selecionarPaleta('${paleta.id}')">
            <div class="color-preview" style="background: linear-gradient(135deg, ${paleta.colors[0]} 0%, ${paleta.colors[1]} 50%, ${paleta.colors[2]} 100%);"></div>
            <span>${paleta.name}</span>
        </div>
    `).join('');
}

function renderEstilos() {
    const select = document.getElementById('styleSelect');
    if (!select) return;
    
    // Agrupar estilos
    const grupos = {};
    ESTILOS.forEach(estilo => {
        if (!grupos[estilo.group]) grupos[estilo.group] = [];
        grupos[estilo.group].push(estilo);
    });
    
    let html = '<option value="">Selecione um estilo...</option>';
    
    for (const [grupo, estilos] of Object.entries(grupos)) {
        html += `<optgroup label="${grupo}">`;
        estilos.forEach(estilo => {
            html += `<option value="${estilo.id}">${estilo.emoji} ${estilo.name}</option>`;
        });
        html += '</optgroup>';
    }
    
    select.innerHTML = html;
}

function renderCategorias() {
    const container = document.getElementById('categoriaPills');
    if (!container) return;
    
    container.innerHTML = CATEGORIAS.map(cat => `
        <button class="categoria-pill" 
                data-id="${cat.id}"
                onclick="selecionarCategoria('${cat.id}')">
            ${cat.icon} ${cat.name}
        </button>
    `).join('');
}

function renderProfissoes() {
    const grid = document.getElementById('profissoesGrid');
    if (!grid) return;
    
    grid.innerHTML = PROFISSOES.map(prof => `
        <div class="submenu-item" onclick="selecionarSubmenu('${prof.id}', '${prof.name}', '${prof.icon}', 'profissoes')">
            <span class="icon">${prof.icon}</span>
            <span class="name">${prof.name}</span>
        </div>
    `).join('');
}

function renderSignos() {
    const grid = document.getElementById('signosGrid');
    if (!grid) return;
    
    grid.innerHTML = SIGNOS.map(signo => `
        <div class="submenu-item" onclick="selecionarSubmenu('${signo.id}', '${signo.name}', '${signo.icon}', 'signos')">
            <span class="icon">${signo.icon}</span>
            <span class="name">${signo.name}</span>
        </div>
    `).join('');
}

// ==================== SELEÇÕES ====================

function selecionarNicho(id, name, icon, hasSubmenu, submenuType) {
    // Se tem submenu, abre modal
    if (hasSubmenu) {
        if (submenuType === 'profissoes') {
            abrirModal('modalProfissoes');
        } else if (submenuType === 'signos') {
            abrirModal('modalSignos');
        }
        return;
    }
    
    // Atualiza estado
    state.selectedNicho = id;
    state.selectedNichoName = name;
    state.selectedNichoIcon = icon;
    
    // Atualiza visual
    document.querySelectorAll('.nicho-pill').forEach(pill => {
        pill.classList.toggle('selected', pill.dataset.id === id);
    });
    
    // Mostra dica do nicho
    mostrarDicaNicho(id);
    
    // Mostra filtro de categorias
    document.getElementById('categoriaFilter').classList.add('show');
    
    // Habilita botão de gerar ideia
    document.getElementById('btnGerarIdeia').disabled = false;
}

function selecionarSubmenu(id, name, icon, type) {
    // Fecha modal
    fecharModal(type === 'profissoes' ? 'modalProfissoes' : 'modalSignos');
    
    // Atualiza estado
    state.selectedNicho = id;
    state.selectedNichoName = name;
    state.selectedNichoIcon = icon;
    
    // Atualiza visual - marca o pai (Profissões ou Signos)
    const parentId = type === 'profissoes' ? 'jobs' : 'zodiac';
    document.querySelectorAll('.nicho-pill').forEach(pill => {
        pill.classList.toggle('selected', pill.dataset.id === parentId);
    });
    
    // Mostra dica
    mostrarDicaNicho(id);
    
    // Mostra filtro de categorias
    document.getElementById('categoriaFilter').classList.add('show');
    
    // Habilita botão
    document.getElementById('btnGerarIdeia').disabled = false;
    
    showToast(`${icon} ${name} selecionado!`);
}

function selecionarPaleta(id) {
    state.selectedPaleta = id;
    
    document.querySelectorAll('.paleta-pill').forEach(pill => {
        pill.classList.toggle('selected', pill.dataset.id === id);
    });
}

function selecionarCategoria(id) {
    state.selectedCategoria = id;
    
    document.querySelectorAll('.categoria-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.id === id);
    });
}

function mostrarDicaNicho(nichoId) {
    const dicaContainer = document.getElementById('dicaNicho');
    if (!dicaContainer) return;
    
    // Procura dica específica ou usa dica do pai
    let dica = DICAS_NICHO[nichoId];
    
    // Se não encontrou, tenta o pai (para profissões e signos)
    if (!dica) {
        if (nichoId.startsWith('jobs_')) {
            dica = DICAS_NICHO['jobs'];
        } else if (nichoId.startsWith('zodiac_')) {
            dica = DICAS_NICHO['zodiac'];
        }
    }
    
    if (dica) {
        dicaContainer.innerHTML = dica;
        dicaContainer.classList.add('show');
    } else {
        dicaContainer.classList.remove('show');
    }
}

// ==================== GERAR IDEIA ALEATÓRIA ====================

function gerarIdeiaAleatoria() {
    if (!state.selectedNicho) {
        showToast('👆 Selecione um nicho primeiro!');
        return;
    }
    
    // Determina de onde buscar as ideias
    let nichoParaBusca = state.selectedNicho;
    
    // Se é uma profissão ou signo específico, usa o banco geral
    if (state.selectedNicho.startsWith('jobs_')) {
        nichoParaBusca = 'jobs';
    } else if (state.selectedNicho.startsWith('zodiac_')) {
        nichoParaBusca = 'zodiac';
    }
    
    const ideiasNicho = state.bancoIdeias[nichoParaBusca];
    
    if (!ideiasNicho) {
        // Fallback: gera ideia genérica baseada no nicho
        const ideiaGenerica = gerarIdeiaGenerica();
        document.getElementById('themeInput').value = ideiaGenerica;
        document.getElementById('btnOutraIdeia').disabled = false;
        showToast('💡 Ideia gerada!');
        return;
    }
    
    // Se tem categoria selecionada, busca só dela
    let todasIdeias = [];
    
    if (state.selectedCategoria && ideiasNicho[state.selectedCategoria]) {
        todasIdeias = ideiasNicho[state.selectedCategoria];
    } else {
        // Junta todas as categorias
        for (const categoria in ideiasNicho) {
            if (Array.isArray(ideiasNicho[categoria])) {
                todasIdeias = todasIdeias.concat(ideiasNicho[categoria]);
            }
        }
    }
    
    if (todasIdeias.length === 0) {
        const ideiaGenerica = gerarIdeiaGenerica();
        document.getElementById('themeInput').value = ideiaGenerica;
        document.getElementById('btnOutraIdeia').disabled = false;
        showToast('💡 Ideia gerada!');
        return;
    }
    
    // Escolhe aleatoriamente
    const ideiaEscolhida = todasIdeias[Math.floor(Math.random() * todasIdeias.length)];
    
    // Personaliza com o nicho específico se for profissão/signo
    let ideiaFinal = ideiaEscolhida;
    if (state.selectedNicho.startsWith('jobs_') || state.selectedNicho.startsWith('zodiac_')) {
        ideiaFinal = personalizarIdeia(ideiaEscolhida, state.selectedNichoName);
    }
    
    document.getElementById('themeInput').value = ideiaFinal;
    document.getElementById('btnOutraIdeia').disabled = false;
    
    showToast('💡 Ideia gerada!');
}

function gerarIdeiaGenerica() {
    const templates = [
        `${state.selectedNichoIcon} ${state.selectedNichoName} em ação dinâmica`,
        `Silhueta estilizada de ${state.selectedNichoName}`,
        `${state.selectedNichoName} em estilo artístico moderno`,
        `Ícone de ${state.selectedNichoName} com elementos criativos`,
        `${state.selectedNichoName} - design minimalista elegante`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

function personalizarIdeia(ideia, nichoNome) {
    // Adiciona contexto do nicho específico
    if (!ideia.toLowerCase().includes(nichoNome.toLowerCase())) {
        return `${ideia} - tema ${nichoNome}`;
    }
    return ideia;
}

// ==================== GERAÇÃO DE PROMPTS ====================

function gerarPrompts() {
    // Validações
    if (!state.selectedNicho) {
        showToast('👆 Selecione um nicho!');
        return;
    }
    
    const styleSelect = document.getElementById('styleSelect');
    if (!styleSelect.value) {
        showToast('🎨 Selecione um estilo!');
        return;
    }
    
    if (!state.selectedPaleta) {
        showToast('🎨 Selecione uma paleta!');
        return;
    }
    
    const themeInput = document.getElementById('themeInput');
    if (!themeInput.value.trim()) {
        showToast('✏️ Descreva sua ideia!');
        return;
    }
    
    // Busca dados selecionados
    const estilo = ESTILOS.find(e => e.id === styleSelect.value);
    const paleta = PALETAS.find(p => p.id === state.selectedPaleta);
    const tema = themeInput.value.trim();
    const imageRef = document.getElementById('imageRef').value.trim();
    
    // Keywords do nicho
    const nichoKeywords = NICHO_KEYWORDS[state.selectedNicho] || '';
    
    // Paleta keywords (vazio se IA decide)
    const paletaKeywords = paleta.keywords || '';
    
    // Gera os 3 prompts
    state.currentPrompts.leonardo = gerarPromptLeonardo(estilo, tema, nichoKeywords, paletaKeywords, imageRef);
    state.currentPrompts.midjourney = gerarPromptMidjourney(estilo, tema, nichoKeywords, paletaKeywords, imageRef);
    state.currentPrompts.gemini = gerarPromptGemini(estilo, tema, state.selectedNichoName, paleta.name, imageRef);
    
    // Exibe resultados
    exibirResultados(estilo, paleta);
    
    // Salva no histórico
    salvarNoHistorico(estilo, paleta, tema);
    
    // Incrementa contador
    state.promptCount++;
    atualizarContador();
    salvarDadosLocais();
}

function gerarPromptLeonardo(estilo, tema, nichoKeywords, paletaKeywords, imageRef) {
    let prompt = `${estilo.promptBase}, depicting "${tema}"`;
    
    if (nichoKeywords) {
        prompt += `, ${nichoKeywords}`;
    }
    
    if (paletaKeywords) {
        prompt += `, ${paletaKeywords}`;
    }
    
    prompt += `, ${PROMPT_SUFFIX.universal}, ${PROMPT_SUFFIX.leonardo}`;
    
    if (imageRef) {
        prompt += ` [Use reference image for style: ${imageRef}]`;
    }
    
    return prompt;
}

function gerarPromptMidjourney(estilo, tema, nichoKeywords, paletaKeywords, imageRef) {
    // Prompt mais conciso para Midjourney
    let prompt = '';
    
    if (imageRef) {
        prompt += `${imageRef} `;
    }
    
    prompt += `${estilo.promptBase}, "${tema}"`;
    
    if (nichoKeywords) {
        // Pega só as 3 primeiras keywords para manter conciso
        const keywords = nichoKeywords.split(', ').slice(0, 3).join(', ');
        prompt += `, ${keywords}`;
    }
    
    if (paletaKeywords) {
        // Resumo da paleta
        const paletaResumo = paletaKeywords.split(', ')[0];
        prompt += `, ${paletaResumo}`;
    }
    
    prompt += `, t-shirt graphic design, isolated on white`;
    
    // Parâmetros
    const aspect = document.getElementById('mjAspect')?.value || '1:1';
    const version = document.getElementById('mjVersion')?.value || '6.1';
    const style = document.getElementById('mjStyle')?.value || 'raw';
    
    prompt += ` --ar ${aspect} --v ${version} --style ${style} ${PROMPT_SUFFIX.midjourney}`;
    
    return prompt;
}

function gerarPromptGemini(estilo, tema, nichoNome, paletaNome, imageRef) {
    // Busca keywords do nicho em inglês
    const nichoKey = state.selectedNicho;
    const nichoKeywords = NICHO_KEYWORDS[nichoKey] || '';
    
    // Busca keywords da paleta
    const paleta = PALETAS.find(p => p.id === state.selectedPaleta);
    const paletaKeywords = paleta && paleta.id !== 'auto' ? paleta.keywords : 'choose the best colors for the theme';
    
    let prompt = `Create a t-shirt graphic illustration.

STYLE: ${estilo.name} - ${estilo.description}

THEME: ${tema}

NICHE KEYWORDS: ${nichoKeywords}

COLOR PALETTE: ${paletaKeywords}

TECHNICAL REQUIREMENTS:
- Print-ready artwork with clean sharp edges for easy cutting
- Isolated on solid background (white or transparent)
- High resolution suitable for DTF/DTG sublimation printing
- No mockup, no t-shirt, just the graphic element
- No person wearing the shirt
- High contrast for printing quality`;

    if (imageRef) {
        prompt += `

REFERENCE: Use the uploaded image as style and composition reference.`;
    }

    return prompt;
}

function exibirResultados(estilo, paleta) {
    // Preenche os prompt boxes
    document.getElementById('promptLeonardo').textContent = state.currentPrompts.leonardo;
    document.getElementById('promptMidjourney').textContent = state.currentPrompts.midjourney;
    document.getElementById('promptGemini').textContent = state.currentPrompts.gemini;
    
    // Tips por IA
    document.getElementById('tipLeonardo').innerHTML = `<strong>💡 Modelo sugerido:</strong> ${estilo.modeloLeonardo}`;
    document.getElementById('tipMidjourney').innerHTML = `<strong>💡 Dica:</strong> Cole direto no Discord do Midjourney`;
    document.getElementById('tipGemini').innerHTML = `<strong>💡 Dica:</strong> Faça upload da imagem de referência junto com este prompt`;
    
    // Badges
    const badgesContainer = document.getElementById('resultBadges');
    badgesContainer.innerHTML = `
        <span class="badge badge-nicho">${state.selectedNichoIcon} ${state.selectedNichoName}</span>
        <span class="badge badge-style">${estilo.emoji} ${estilo.name}</span>
        <span class="badge badge-paleta">🎨 ${paleta.name}</span>
    `;
    
    // Recomendação de IA
    const recommendation = AI_RECOMMENDATIONS[estilo.id];
    const recContainer = document.getElementById('aiRecommendation');
    
    if (recommendation) {
        const icons = { leonardo: '🎨', midjourney: '🎭', gemini: '🍌' };
        const names = { leonardo: 'Leonardo.ai', midjourney: 'Midjourney', gemini: 'Gemini' };
        
        recContainer.innerHTML = `
            <h4>💡 Recomendação para "${estilo.name}"</h4>
            <p><span class="recommended">${icons[recommendation.best]} ${names[recommendation.best]}</span> - ${recommendation.reason}</p>
        `;
    } else {
        recContainer.innerHTML = `
            <h4>💡 Dica</h4>
            <p>Teste os 3 prompts e veja qual resultado você prefere!</p>
        `;
    }
    
    // Info box
    const infoBox = document.getElementById('infoBox');
    infoBox.innerHTML = `
        <strong>Estilo:</strong> ${estilo.description}<br><br>
        <strong>Paleta:</strong> ${paleta.name}${paleta.id === 'auto' ? ' - A IA escolherá as melhores cores' : ''}<br><br>
        <strong>Dica:</strong> ${DICAS_NICHO[state.selectedNicho] || DICAS_NICHO['custom']}
    `;
    
    // Mostra seção de resultados
    document.getElementById('resultSection').classList.add('show');
    
    // Scroll suave até resultados
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// ==================== APP.JS (CONTINUAÇÃO) ====================

// ==================== SURPRESA TOTAL ====================

function surpresaTotal() {
    // Seleciona nicho aleatório (exceto os com submenu)
    const nichosSimples = NICHOS.filter(n => !n.hasSubmenu && n.id !== 'custom');
    const nichoAleatorio = nichosSimples[Math.floor(Math.random() * nichosSimples.length)];
    
    // Seleciona o nicho
    selecionarNicho(nichoAleatorio.id, nichoAleatorio.name, nichoAleatorio.icon, false, '');
    
    // Seleciona estilo aleatório
    const estiloAleatorio = ESTILOS[Math.floor(Math.random() * ESTILOS.length)];
    document.getElementById('styleSelect').value = estiloAleatorio.id;
    state.selectedStyle = estiloAleatorio.id;
    
    // Seleciona paleta aleatória
    const paletaAleatoria = PALETAS[Math.floor(Math.random() * PALETAS.length)];
    selecionarPaleta(paletaAleatoria.id);
    
    // Gera ideia aleatória
    gerarIdeiaAleatoria();
    
    // Pequeno delay para garantir que tudo foi preenchido
    setTimeout(() => {
        gerarPrompts();
        showToast('🎲 Surpresa gerada!');
    }, 100);
}

// ==================== HISTÓRICO ====================

function salvarNoHistorico(estilo, paleta, tema) {
    const item = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        nicho: {
            id: state.selectedNicho,
            name: state.selectedNichoName,
            icon: state.selectedNichoIcon
        },
        estilo: {
            id: estilo.id,
            name: estilo.name,
            emoji: estilo.emoji
        },
        paleta: {
            id: paleta.id,
            name: paleta.name
        },
        tema: tema,
        prompts: { ...state.currentPrompts }
    };
    
    // Adiciona no início
    state.historico.unshift(item);
    
    // Limita a 50 itens
    if (state.historico.length > 50) {
        state.historico = state.historico.slice(0, 50);
    }
    
    salvarDadosLocais();
}

function renderHistorico() {
    const lista = document.getElementById('historicoList');
    const empty = document.getElementById('historicoEmpty');
    
    if (!lista || !empty) return;
    
    if (state.historico.length === 0) {
        lista.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    lista.style.display = 'flex';
    empty.style.display = 'none';
    
    lista.innerHTML = state.historico.map(item => `
        <div class="historico-item" data-id="${item.id}">
            <div class="historico-item-header">
                <span class="historico-item-date">${item.data}</span>
                <div class="historico-item-badges">
                    <span class="badge badge-nicho">${item.nicho.icon} ${item.nicho.name}</span>
                    <span class="badge badge-style">${item.estilo.emoji}</span>
                </div>
            </div>
            <div class="historico-item-preview">${item.tema}</div>
            <div class="historico-item-actions">
                <button onclick="reutilizarHistorico(${item.id})">🔄 Reutilizar</button>
                <button onclick="copiarHistorico(${item.id})">📋 Copiar</button>
                <button onclick="removerHistorico(${item.id})">🗑️ Remover</button>
            </div>
        </div>
    `).join('');
}

function reutilizarHistorico(id) {
    const item = state.historico.find(h => h.id === id);
    if (!item) return;
    
    // Restaura seleções
    selecionarNicho(item.nicho.id, item.nicho.name, item.nicho.icon, false, '');
    document.getElementById('styleSelect').value = item.estilo.id;
    selecionarPaleta(item.paleta.id);
    document.getElementById('themeInput').value = item.tema;
    
    // Fecha modal
    fecharModal('modalHistorico');
    
    showToast('✅ Configurações restauradas!');
}

function copiarHistorico(id) {
    const item = state.historico.find(h => h.id === id);
    if (!item) return;
    
    const texto = `=== PROMPTFORGE ===
📅 ${item.data}
${item.nicho.icon} ${item.nicho.name} | ${item.estilo.emoji} ${item.estilo.name} | 🎨 ${item.paleta.name}

📝 Tema: ${item.tema}

🎨 LEONARDO.AI:
${item.prompts.leonardo}

🎭 MIDJOURNEY:
${item.prompts.midjourney}

🍌 GEMINI:
${item.prompts.gemini}
`;
    
    navigator.clipboard.writeText(texto).then(() => {
        showToast('📋 Prompts copiados!');
    });
}

function removerHistorico(id) {
    state.historico = state.historico.filter(h => h.id !== id);
    salvarDadosLocais();
    renderHistorico();
    showToast('🗑️ Removido do histórico');
}

function limparHistorico() {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        state.historico = [];
        salvarDadosLocais();
        renderHistorico();
        showToast('🗑️ Histórico limpo!');
    }
}

// ==================== FAVORITOS ====================

function favoritarAtual() {
    if (!state.currentPrompts.leonardo) {
        showToast('⚠️ Gere um prompt primeiro!');
        return;
    }
    
    const estilo = ESTILOS.find(e => e.id === document.getElementById('styleSelect').value);
    const paleta = PALETAS.find(p => p.id === state.selectedPaleta);
    const tema = document.getElementById('themeInput').value;
    
    const favorito = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        nicho: {
            id: state.selectedNicho,
            name: state.selectedNichoName,
            icon: state.selectedNichoIcon
        },
        estilo: {
            id: estilo.id,
            name: estilo.name,
            emoji: estilo.emoji
        },
        paleta: {
            id: paleta.id,
            name: paleta.name
        },
        tema: tema,
        prompts: { ...state.currentPrompts }
    };
    
    // Verifica se já existe
    const existe = state.favoritos.some(f => 
        f.tema === favorito.tema && 
        f.nicho.id === favorito.nicho.id && 
        f.estilo.id === favorito.estilo.id
    );
    
    if (existe) {
        showToast('⭐ Já está nos favoritos!');
        return;
    }
    
    state.favoritos.unshift(favorito);
    salvarDadosLocais();
    
    showToast('⭐ Adicionado aos favoritos!');
}

function renderFavoritos() {
    const lista = document.getElementById('favoritosList');
    const empty = document.getElementById('favoritosEmpty');
    
    if (!lista || !empty) return;
    
    if (state.favoritos.length === 0) {
        lista.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    lista.style.display = 'flex';
    empty.style.display = 'none';
    
    lista.innerHTML = state.favoritos.map(item => `
        <div class="favorito-item" data-id="${item.id}">
            <div class="favorito-item-header">
                <span class="favorito-item-date">${item.data}</span>
                <div class="favorito-item-badges">
                    <span class="badge badge-nicho">${item.nicho.icon} ${item.nicho.name}</span>
                    <span class="badge badge-style">${item.estilo.emoji}</span>
                </div>
            </div>
            <div class="favorito-item-preview">${item.tema}</div>
            <div class="favorito-item-actions">
                <button onclick="reutilizarFavorito(${item.id})">🔄 Usar</button>
                <button onclick="copiarFavorito(${item.id})">📋 Copiar</button>
                <button onclick="removerFavorito(${item.id})">❌ Remover</button>
            </div>
        </div>
    `).join('');
}

function reutilizarFavorito(id) {
    const item = state.favoritos.find(f => f.id === id);
    if (!item) return;
    
    selecionarNicho(item.nicho.id, item.nicho.name, item.nicho.icon, false, '');
    document.getElementById('styleSelect').value = item.estilo.id;
    selecionarPaleta(item.paleta.id);
    document.getElementById('themeInput').value = item.tema;
    
    fecharModal('modalFavoritos');
    showToast('✅ Favorito carregado!');
}

function copiarFavorito(id) {
    const item = state.favoritos.find(f => f.id === id);
    if (!item) return;
    
    copiarHistorico(id); // Reutiliza a mesma lógica
}

function removerFavorito(id) {
    state.favoritos = state.favoritos.filter(f => f.id !== id);
    salvarDadosLocais();
    renderFavoritos();
    showToast('❌ Removido dos favoritos');
}

// ==================== COPIAR PROMPTS ====================

function copiarPrompt(target) {
    const elemento = document.getElementById(target);
    if (!elemento) return;
    
    navigator.clipboard.writeText(elemento.textContent).then(() => {
        showToast('📋 Copiado!');
    });
}

function copiarTodosPrompts() {
    const texto = `=== PROMPTFORGE - PROMPTS GERADOS ===

🎨 LEONARDO.AI:
${state.currentPrompts.leonardo}

🎭 MIDJOURNEY:
${state.currentPrompts.midjourney}

🍌 GEMINI:
${state.currentPrompts.gemini}

🚫 NEGATIVE PROMPT:
${NEGATIVE_PROMPT}
`;
    
    navigator.clipboard.writeText(texto).then(() => {
        showToast('📋 Todos os prompts copiados!');
    });
}

function copiarNegativePrompt() {
    navigator.clipboard.writeText(NEGATIVE_PROMPT).then(() => {
        showToast('🚫 Negative prompt copiado!');
    });
}

// ==================== EXPORTAR ====================

function exportarTxt() {
    const texto = `=== PROMPTFORGE - PROMPTS GERADOS ===
📅 ${new Date().toLocaleString('pt-BR')}
${state.selectedNichoIcon} ${state.selectedNichoName}

📝 Tema: ${document.getElementById('themeInput').value}

═══════════════════════════════════════

🎨 LEONARDO.AI:
${state.currentPrompts.leonardo}

💡 Modelo sugerido: ${ESTILOS.find(e => e.id === document.getElementById('styleSelect').value)?.modeloLeonardo || 'Leonardo Diffusion XL'}

═══════════════════════════════════════

🎭 MIDJOURNEY:
${state.currentPrompts.midjourney}

═══════════════════════════════════════

🍌 GEMINI:
${state.currentPrompts.gemini}

═══════════════════════════════════════

🚫 NEGATIVE PROMPT:
${NEGATIVE_PROMPT}

═══════════════════════════════════════
Gerado por PromptForge
`;
    
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptforge_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    fecharModal('modalExportar');
    showToast('📄 Arquivo salvo!');
}

function exportarCopiar() {
    copiarTodosPrompts();
    fecharModal('modalExportar');
}

function exportarWhatsapp() {
    const texto = encodeURIComponent(`*PROMPTFORGE* 🚀

${state.selectedNichoIcon} *${state.selectedNichoName}*

📝 *Tema:* ${document.getElementById('themeInput').value}

🎨 *Leonardo.ai:*
${state.currentPrompts.leonardo}

🎭 *Midjourney:*
${state.currentPrompts.midjourney}

🍌 *Gemini:*
${state.currentPrompts.gemini}
`);
    
    window.open(`https://wa.me/?text=${texto}`, '_blank');
    fecharModal('modalExportar');
}

// ==================== PREVIEW DE IMAGEM ====================

function setupImagePreview() {
    const input = document.getElementById('imageRef');
    const container = document.getElementById('imagePreviewContainer');
    const preview = document.getElementById('imagePreview');
    const status = document.getElementById('imageStatus');
    const btnRemove = document.getElementById('btnRemoveImage');
    
    if (!input) return;
    
    // Debounce para não carregar a cada tecla
    let timeout;
    
    input.addEventListener('input', function() {
        clearTimeout(timeout);
        
        const url = this.value.trim();
        
        if (!url) {
            container.classList.remove('show');
            return;
        }
        
        timeout = setTimeout(() => {
            carregarPreviewImagem(url);
        }, 500);
    });
    
    btnRemove?.addEventListener('click', function() {
        input.value = '';
        container.classList.remove('show');
    });
}

function carregarPreviewImagem(url) {
    const container = document.getElementById('imagePreviewContainer');
    const preview = document.getElementById('imagePreview');
    const status = document.getElementById('imageStatus');
    
    // Valida URL básica
    if (!url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)/i) && !url.match(/^https?:\/\/.+/)) {
        status.textContent = '⚠️ URL inválida';
        status.classList.add('error');
        container.classList.add('show');
        preview.innerHTML = '';
        return;
    }
    
    status.textContent = '⏳ Carregando...';
    status.classList.remove('error');
    container.classList.add('show');
    
    const img = new Image();
    
    img.onload = function() {
        preview.innerHTML = `<img src="${url}" alt="Referência">`;
        status.textContent = `✅ Imagem carregada (${this.width}x${this.height})`;
        status.classList.remove('error');
    };
    
    img.onerror = function() {
        preview.innerHTML = '';
        status.textContent = '❌ Não foi possível carregar a imagem';
        status.classList.add('error');
    };
    
    img.src = url;
}

// ==================== MODAIS ====================

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Renderiza conteúdo se necessário
    if (modalId === 'modalHistorico') renderHistorico();
    if (modalId === 'modalFavoritos') renderFavoritos();
    if (modalId === 'modalNegative') {
        document.getElementById('negativePromptBox').textContent = NEGATIVE_PROMPT;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function fecharModalPorClique(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ==================== TEMA ====================

function toggleTema() {
    const html = document.documentElement;
    const temaAtual = html.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', novoTema);
    localStorage.setItem('promptforge_theme', novoTema);
    
    showToast(novoTema === 'dark' ? '🌙 Modo escuro' : '☀️ Modo claro');
}

// ==================== MODO AVANÇADO ====================

function toggleAdvanced() {
    const checkbox = document.getElementById('advancedMode');
    const options = document.getElementById('advancedOptions');
    
    if (!checkbox || !options) return;
    
    state.advancedMode = checkbox.checked;
    options.classList.toggle('show', checkbox.checked);
}

// ==================== UTILITÁRIOS ====================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function atualizarContador() {
    const contador = document.getElementById('promptCount');
    if (contador) {
        contador.textContent = state.promptCount;
    }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Botões principais
    document.getElementById('btnGerar')?.addEventListener('click', gerarPrompts);
    document.getElementById('btnSurpresa')?.addEventListener('click', surpresaTotal);
    
// Abrir no Gemini
document.getElementById('btnAbrirGemini')?.addEventListener('click', abrirNoGemini);

    // Gerar ideia
    document.getElementById('btnGerarIdeia')?.addEventListener('click', gerarIdeiaAleatoria);
    document.getElementById('btnOutraIdeia')?.addEventListener('click', gerarIdeiaAleatoria);
    
    // Header actions
    document.getElementById('btnHistorico')?.addEventListener('click', () => abrirModal('modalHistorico'));
    document.getElementById('btnFavoritos')?.addEventListener('click', () => abrirModal('modalFavoritos'));
    
    // Tema
    document.getElementById('themeToggle')?.addEventListener('click', toggleTema);
    
    // Modo avançado
    document.getElementById('advancedMode')?.addEventListener('change', toggleAdvanced);
    
    // Result actions
    document.getElementById('btnCopiarTodos')?.addEventListener('click', copiarTodosPrompts);
    document.getElementById('btnFavoritar')?.addEventListener('click', favoritarAtual);
    document.getElementById('btnExportar')?.addEventListener('click', () => abrirModal('modalExportar'));
    document.getElementById('btnNegative')?.addEventListener('click', () => abrirModal('modalNegative'));
    
    // Copy buttons nos cards
    document.querySelectorAll('.btn-copy[data-target]').forEach(btn => {
        btn.addEventListener('click', () => copiarPrompt(btn.dataset.target));
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => fecharModal(btn.dataset.modal));
    });
    
    // Fechar modal clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', fecharModalPorClique);
    });
    
    // Histórico actions
    document.getElementById('btnLimparHistorico')?.addEventListener('click', limparHistorico);
    
    // Export actions
    document.getElementById('exportTxt')?.addEventListener('click', exportarTxt);
    document.getElementById('exportCopy')?.addEventListener('click', exportarCopiar);
    document.getElementById('exportWhatsapp')?.addEventListener('click', exportarWhatsapp);
    
    // Negative prompt copy
    document.getElementById('btnCopyNegative')?.addEventListener('click', () => {
        copiarNegativePrompt();
        fecharModal('modalNegative');
    });
    
    // Image preview
    setupImagePreview();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC fecha modais
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = '';
        }
        
        // Ctrl+Enter gera prompts
        if (e.ctrlKey && e.key === 'Enter') {
            gerarPrompts();
        }
    });
}

// ==================== ABRIR NO GEMINI ====================
function abrirNoGemini() {
    if (!state.currentPrompts.gemini) {
        showToast('⚠️ Gere um prompt primeiro!');
        return;
    }
    
    // Copia primeiro
    navigator.clipboard.writeText(state.currentPrompts.gemini).then(() => {
        showToast('📋 Prompt copiado!');
    });
    
    // Abre direto (sem confirm, sem setTimeout)
    window.location.href = 'https://gemini.google.com/app';
}

// ==================== FIM DO APP.JS ====================

console.log('📦 App.js carregado');


