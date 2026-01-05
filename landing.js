document.addEventListener('DOMContentLoaded', () => {
    console.log("PromptForge Landing Page: Ativa e Pronta para Vendas.");
    
    // Suavização para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});