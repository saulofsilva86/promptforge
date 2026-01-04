// ==================== AUTH.JS ====================
// Sistema de Autenticação PromptForge - CORRIGIDO

const AUTH_CONFIG = {
    // URL do seu Apps Script
    apiUrl: 'https://script.google.com/macros/s/AKfycbwdQRWNtAydhEjuGlBB_-p0jd3qWbl8FbjBVSvKFI15EnRDTLjIsENGHaSTD3mdVTPp/exec',
    
    // Chave para armazenar sessão
    storageKey: 'promptforge_session',
    
    // IMPORTANTE: Sempre verificar no servidor a cada acesso
    // Tempo 0 = sempre verifica
    verificarACada: 0
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    // Se estiver na página de login
    if (document.getElementById('loginForm')) {
        // Verifica se já está logado
        verificarSessaoExistente();
        
        // Configura formulário
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', fazerLogin);
    }
});

// ==================== VERIFICAR SESSÃO EXISTENTE ====================
async function verificarSessaoExistente() {
    const sessao = getSessao();
    
    if (sessao && sessao.email) {
        // SEMPRE revalida com o servidor
        await revalidarSessao(sessao.email);
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
            
            // Redireciona para o app
            redirecionarParaApp();
            
        } else {
            // BLOQUEADO ou EXPIRADO - limpa tudo e mostra erro
            limparSessao();
            mostrarErro(data.erro || 'Acesso negado. Faça login novamente.');
        }
        
    } catch (error) {
        // Erro de conexão - NÃO permite acesso offline
        console.error('Erro ao revalidar:', error);
        limparSessao();
        mostrarErro('Erro de conexão. Verifique sua internet.');
    }
}

// ==================== VERIFICAR AUTENTICAÇÃO (para app.html) ====================
async function verificarAutenticacao() {
    const sessao = getSessao();
    
    if (!sessao || !sessao.email) {
        // Sem sessão, redireciona para login
        window.location.href = 'index.html';
        return null;
    }
    
    // NOVO: Verifica se já validou recentemente (últimos 5 minutos)
    const agora = new Date().getTime();
    const ultimaValidacao = sessao.verificadoEm || 0;
    const cincoMinutos = 5 * 60 * 1000; // 5 minutos em milissegundos
    
    if (agora - ultimaValidacao < cincoMinutos) {
        // Validação recente, não precisa verificar no servidor
        console.log('✅ Sessão válida (cache)');
        return sessao;
    }
    
    // Validação expirou, verifica no servidor
    try {
        const url = `${AUTH_CONFIG.apiUrl}?action=login&email=${encodeURIComponent(sessao.email)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.sucesso) {
            // Atualiza sessão com novo timestamp
            salvarSessao({
                email: data.usuario.email,
                nome: data.usuario.nome,
                tipo: data.usuario.tipo,
                expira: data.usuario.expira,
                verificadoEm: new Date().getTime()
            });
            return data.usuario;
            
        } else {
            // BLOQUEADO - limpa e redireciona
            limparSessao();
            alert('❌ ' + (data.erro || 'Seu acesso foi revogado.'));
            window.location.href = 'index.html';
            return null;
        }
        
    } catch (error) {
        // Erro de conexão - USA O CACHE se tiver sessão válida
        console.warn('⚠️ Erro de conexão, usando sessão em cache');
        
        // Se tem sessão salva, permite continuar (modo offline tolerante)
        if (sessao && sessao.email && sessao.nome) {
            console.log('✅ Continuando com sessão em cache (offline)');
            return sessao;
        }
        
        // Sem sessão válida, bloqueia
        limparSessao();
        alert('❌ Erro de conexão. Faça login novamente.');
        window.location.href = 'index.html';
        return null;
    }
}

// ==================== FUNÇÕES AUXILIARES ====================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErro(mensagem) {
    const errorMsg = document.getElementById('errorMessage');
    if (errorMsg) {
        errorMsg.textContent = '❌ ' + mensagem;
        errorMsg.classList.add('show');
    }
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

// ==================== LOGOUT ====================
function fazerLogout() {
    limparSessao();
    window.location.href = 'index.html';
}

// ==================== OBTER USUÁRIO LOGADO ====================
function getUsuarioLogado() {
    return getSessao();
}