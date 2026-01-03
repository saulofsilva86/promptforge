// ==================== AUTH.JS ====================
// Sistema de Autenticação PromptForge

const AUTH_CONFIG = {
    // URL do seu Apps Script
    apiUrl: 'https://script.google.com/macros/s/AKfycbwdQRWNtAydhEjuGlBB_-p0jd3qWbl8FbjBVSvKFI15EnRDTLjIsENGHaSTD3mdVTPp/exec',
    
    // Chave para armazenar sessão
    storageKey: 'promptforge_session',
    
    // Tempo de verificação (em horas) - verifica novamente após X horas
    verificarACada: 24
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se já está logado
    verificarSessaoExistente();
    
    // Configura formulário
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', fazerLogin);
    }
});

// ==================== VERIFICAR SESSÃO EXISTENTE ====================
function verificarSessaoExistente() {
    const sessao = getSessao();
    
    if (sessao) {
        // Verifica se precisa revalidar
        const agora = new Date().getTime();
        const ultimaVerificacao = sessao.verificadoEm || 0;
        const horasPassadas = (agora - ultimaVerificacao) / (1000 * 60 * 60);
        
        if (horasPassadas < AUTH_CONFIG.verificarACada) {
            // Sessão válida, redireciona para o app
            redirecionarParaApp();
            return;
        }
        
        // Revalidar sessão
        revalidarSessao(sessao.email);
    }
}

// ==================== FAZER LOGIN ====================
async function fazerLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const btnLogin = document.getElementById('btnLogin');
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    // Limpa mensagens
    errorMsg.classList.remove('show');
    successMsg.classList.remove('show');
    
    // Valida email
    if (!email || !validarEmail(email)) {
        mostrarErro('Por favor, digite um email válido.');
        return;
    }
    
    // Loading
    btnLogin.disabled = true;
    btnLogin.innerHTML = '<span class="loading-spinner"></span> Verificando...';
    
    try {
        const url = `${AUTH_CONFIG.apiUrl}?action=login&email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.sucesso) {
            // Salva sessão
            salvarSessao({
                email: data.usuario.email,
                nome: data.usuario.nome,
                tipo: data.usuario.tipo,
                expira: data.usuario.expira,
                verificadoEm: new Date().getTime()
            });
            
            // Mostra sucesso
            successMsg.textContent = `✅ Bem-vindo, ${data.usuario.nome}! Redirecionando...`;
            successMsg.classList.add('show');
            
            // Redireciona após 1 segundo
            setTimeout(() => {
                redirecionarParaApp();
            }, 1000);
            
        } else {
            mostrarErro(data.erro || 'Erro ao verificar acesso.');
            btnLogin.disabled = false;
            btnLogin.innerHTML = '🚀 Entrar';
        }
        
    } catch (error) {
        console.error('Erro de conexão:', error);
        mostrarErro('Erro de conexão. Verifique sua internet e tente novamente.');
        btnLogin.disabled = false;
        btnLogin.innerHTML = '🚀 Entrar';
    }
}

// ==================== REVALIDAR SESSÃO ====================
async function revalidarSessao(email) {
    try {
        const url = `${AUTH_CONFIG.apiUrl}?action=login&email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.sucesso) {
            // Atualiza sessão
            salvarSessao({
                email: data.usuario.email,
                nome: data.usuario.nome,
                tipo: data.usuario.tipo,
                expira: data.usuario.expira,
                verificadoEm: new Date().getTime()
            });
            
            // Redireciona
            redirecionarParaApp();
            
        } else {
            // Sessão inválida, limpa e mostra erro
            limparSessao();
            mostrarErro(data.erro || 'Sessão expirada. Faça login novamente.');
        }
        
    } catch (error) {
        // Erro de conexão, mas tem sessão local - permite acesso offline
        console.warn('Erro ao revalidar, usando sessão local');
        redirecionarParaApp();
    }
}

// ==================== FUNÇÕES AUXILIARES ====================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErro(mensagem) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = '❌ ' + mensagem;
    errorMsg.classList.add('show');
}

function salvarSessao(dados) {
    localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(dados));
}

function getSessao() {
    const dados = localStorage.getItem(AUTH_CONFIG.storageKey);
    return dados ? JSON.parse(dados) : null;
}

function limparSessao() {
    localStorage.removeItem(AUTH_CONFIG.storageKey);
}

function redirecionarParaApp() {
    window.location.href = 'app.html';
}

// ==================== FUNÇÕES GLOBAIS (para usar no app) ====================

// Verificar se está autenticado (usar no app.html)
function verificarAutenticacao() {
    const sessao = getSessao();
    if (!sessao) {
        window.location.href = 'index.html';
        return null;
    }
    return sessao;
}

// Fazer logout
function fazerLogout() {
    limparSessao();
    window.location.href = 'index.html';
}

// Obter dados do usuário logado
function getUsuarioLogado() {
    return getSessao();
}