/**
 * OSWALDO PIZZA & LANCHES - Cardápio Digital
 * Script principal - Carrossel, Menu, WhatsApp, Animações
 * 
 * IMPORTANTE: Altere o número de WhatsApp (5511999999999) 
 * para o número real do estabelecimento antes de publicar.
 */

// ============================================
// CONFIGURAÇÃO - NÚMERO WHATSAPP
// Formato: código do país + DDD + número (sem espaços ou traços)
// ============================================
const WHATSAPP_NUMBER = '5511999999999';

// ============================================
// MENU MOBILE
// ============================================

/**
 * Alterna a abertura/fechamento do menu mobile
 */
function toggleMenu() {
    const nav = document.getElementById('navMobile');
    const overlay = document.getElementById('navOverlay');
    const btn = document.querySelector('.btn-menu');
    
    if (nav && btn) {
        const isOpening = !nav.classList.contains('open');
        nav.classList.toggle('open');
        btn.classList.toggle('active');
        overlay?.classList.toggle('active', isOpening);
        document.body.style.overflow = isOpening ? 'hidden' : '';
    }
}

// Fecha o menu ao clicar em um link, no overlay ou no botão X
function closeMobileMenu() {
    document.getElementById('navMobile')?.classList.remove('open');
    document.getElementById('navOverlay')?.classList.remove('active');
    document.querySelector('.btn-menu')?.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// CARROSSEL DE IMAGENS
// ============================================

let currentSlide = 0;
let slideInterval;

/**
 * Inicializa o carrossel (apenas na página inicial)
 */
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !dotsContainer) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    // Cria os dots de navegação
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    /**
     * Atualiza a visualização do carrossel
     */
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    /**
     * Vai para um slide específico
     */
    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        updateCarousel();
        resetCarouselInterval();
    }
    
    /**
     * Reinicia o intervalo de auto-play
     */
    function resetCarouselInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 4000);
    }
    
    // Funções globais para os botões
    window.prevSlide = () => goToSlide(currentSlide - 1);
    window.nextSlide = () => goToSlide(currentSlide + 1);
    
    updateCarousel();
    resetCarouselInterval();
}

// ============================================
// WHATSAPP - PEDIDO
// ============================================

/**
 * Abre o WhatsApp com mensagem formatada para o pedido
 * @param {string} produto - Nome do produto a ser pedido
 * @param {string} [tamanho] - Tamanho (para pizzas)
 * @param {string} [observacoes] - Observações do pedido
 */
function pedirWhatsApp(produto, tamanho = '', observacoes = '') {
    let mensagem = `Olá, gostaria de pedir: ${produto}`;
    if (tamanho) mensagem += `. Tamanho: ${tamanho}`;
    if (observacoes) mensagem += `. Observações: ${observacoes}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Expõe a função globalmente para os botões onclick
window.pedirWhatsApp = pedirWhatsApp;

// ============================================
// MODAL DO PRODUTO
// ============================================

/**
 * Abre o modal de produto com os dados do card
 * @param {HTMLElement} card - Elemento do card (product-card ou highlight-card)
 */
function openProductModal(card) {
    if (!card) return;
    
    const imgEl = card.querySelector('.product-image, .highlight-image');
    const nameEl = card.querySelector('.product-name, .highlight-content h3');
    const descEl = card.querySelector('.product-description, .highlight-content p:not(.highlight-price):not(.product-price)');
    const priceEl = card.querySelector('.product-price, .highlight-price');
    
    const imageUrl = imgEl ? (imgEl.style.backgroundImage?.match(/url\(["']?([^"')]+)["']?\)/)?.[1] || '') : '';
    const name = nameEl?.textContent?.trim() || card.dataset.product || '';
    const description = descEl?.textContent?.trim() || card.dataset.description || '';
    const price = priceEl?.textContent?.trim() || '';
    
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('productModalOverlay');
    
    if (modal && overlay) {
        modal.querySelector('.modal-image').style.backgroundImage = imageUrl ? `url('${imageUrl}')` : 'none';
        modal.querySelector('.modal-title').textContent = name;
        modal.querySelector('.modal-description').textContent = description || 'Ingredientes selecionados e preparo artesanal para garantir o melhor sabor.';
        modal.querySelector('.modal-price').textContent = price;
        
        const sizeField = document.getElementById('modalSizeField');
        const sizeSelect = document.getElementById('modalPizzaSize');
        const observationsInput = document.getElementById('modalObservations');
        
        if (sizeField) {
            sizeField.style.display = name.toLowerCase().includes('pizza') ? 'block' : 'none';
            if (sizeSelect) sizeSelect.value = '';
        }
        if (observationsInput) observationsInput.value = '';
        
        modal.querySelector('.modal-order-btn').onclick = () => {
            const tamanho = sizeSelect?.value?.trim() || '';
            const observacoes = observationsInput?.value?.trim() || '';
            pedirWhatsApp(name, tamanho, observacoes);
            closeProductModal();
        };
        
        overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        document.addEventListener('keydown', handleModalEscape);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeProductModal();
        document.removeEventListener('keydown', handleModalEscape);
    }
}

/**
 * Fecha o modal de produto
 */
function closeProductModal() {
    document.removeEventListener('keydown', handleModalEscape);
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('productModalOverlay');
    
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;

// ============================================
// EFEITO RIPPLE NOS BOTÕES
// ============================================

/**
 * Cria efeito ripple ao clicar em botões (feedback visual premium)
 */
function initRippleEffect() {
    document.querySelectorAll('.btn-order, .btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// ESTADO ATIVO DAS CATEGORIAS
// ============================================

/**
 * Marca o link do menu correspondente à página atual com a classe "active".
 * Funciona em todas as páginas (Home, Pizzas, Lanches, Bebidas, Porções).
 * Suporta: /pizzas, /pizzas.html, file://, subdiretórios.
 */
function setActiveNavLink() {
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/').filter(Boolean);
    let currentPage = pathParts[pathParts.length - 1] || 'index.html';
    if (pathname === '/' || pathname === '' || (pathname.endsWith('/') && !pathParts.length)) {
        currentPage = 'index.html';
    }
    // Normaliza: "pizzas" e "pizzas.html" devem casar
    const currentBase = currentPage.replace(/\.html$/, '') || 'index';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('//')) return;

        const linkPage = (href.split('/').pop() || '').split('?')[0].split('#')[0] || 'index.html';
        const linkBase = linkPage.replace(/\.html$/, '') || 'index';
        const isActive = linkPage === currentPage || linkBase === currentBase;
        link.classList.toggle('active', isActive);
    });
}

/**
 * Marca a categoria/item ativo na navegação baseado na página atual
 */
function initCategoryActiveState() {
    setActiveNavLink();
    
    // Category chips - marcar ativo baseado na página
    const path = window.location.pathname;
    const page = path.split('/').pop() || (path === '/' ? 'index.html' : '');
    document.querySelectorAll('.category-chip[data-category]').forEach(chip => {
        const category = chip.getAttribute('data-category');
        const isActive = page === category + '.html';
        chip.classList.toggle('active', isActive);
    });
}

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================

/**
 * Volta suavemente ao topo da página
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.scrollToTop = scrollToTop;

/**
 * Mostra/oculta o botão baseado na posição do scroll
 */
function toggleBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    if (window.scrollY > 400) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}

// ============================================
// HEADER - EFEITO SCROLL
// ============================================

/**
 * Adiciona classe ao header quando o usuário rola a página
 */
function toggleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ============================================
// LOADING INICIAL - Fade-in da página
// ============================================

/**
 * Inicializa o loading e faz fade-in suave do conteúdo
 */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    const hideLoader = () => {
        document.body.classList.remove('page-loading');
        document.body.classList.add('loaded');
    };
    
    // Mínimo de 400ms para suavidade visual
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 400);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 400));
    }
}

// ============================================
// ANIMAÇÕES DE SCROLL (Intersection Observer)
// ============================================

/**
 * Intersection Observer para produtos - fade-in + slide up (0.6s-0.8s)
 */
function initProductAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para efeito em cascata
                const delay = Math.min(index * 80, 400);
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Observa elementos e adiciona animação quando entram na viewport
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.category-chip, .highlight-card, .category-card-home, .review-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Atualiza todos os links do WhatsApp com o número configurado
 * Basta alterar WHATSAPP_NUMBER no início do arquivo
 */
function updateWhatsAppLinks() {
    const links = document.querySelectorAll('a[href^="https://wa.me/"]');
    links.forEach(link => {
        const text = link.getAttribute('href').match(/text=([^&]*)/);
        const mensagem = text ? text[1] : '';
        link.href = `https://wa.me/${WHATSAPP_NUMBER}${mensagem ? '?text=' + mensagem : ''}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Loading inicial
    initPageLoader();
    
    // Links do WhatsApp
    updateWhatsAppLinks();
    
    // Carrossel (apenas na index)
    initCarousel();
    
    // Animações - produtos com Intersection Observer
    initProductAnimations();
    
    // Animações - categorias
    initScrollAnimations();
    
    // Efeito ripple nos botões
    initRippleEffect();
    
    // Estado ativo das categorias/navegação (menu destaca página atual)
    initCategoryActiveState();
    
    // Fallback: reaplica destaque do menu no load (garante funcionamento em todos os ambientes)
    window.addEventListener('load', setActiveNavLink);
    
    // Scroll listeners
    window.addEventListener('scroll', () => {
        toggleBackToTop();
        toggleHeaderScroll();
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
});
