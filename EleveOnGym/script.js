/**
 * Eleveon Gym - JavaScript
 * Script para interatividade do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initFormValidation();
    initScrollToTop();
});

/**
 * Menu Mobile
 * Alterna o menu hamburger em dispositivos móveis
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth Scroll
 * Rolagem suave para links internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 * Anima elementos ao rolar a página
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.equipment-card, .feature-card, .plan-card, .product-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

/**
 * Header Scroll
 * Altera o header ao rolar a página
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Verifica a posição inicial
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        }
    }
}

/**
 * Form Validation
 * Validação básica do formulário de contato
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtém os valores dos campos
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');
            
            // Validação básica
            let isValid = true;
            let errorMessage = '';
            
            if (!nome.value.trim()) {
                isValid = false;
                errorMessage = 'Por favor, preencha seu nome.';
                nome.style.borderColor = '#ff4444';
            } else {
                nome.style.borderColor = '';
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                if (!errorMessage) errorMessage = 'Por favor, preencha um email válido.';
                email.style.borderColor = '#ff4444';
            } else {
                email.style.borderColor = '';
            }
            
            if (!telefone.value.trim()) {
                isValid = false;
                if (!errorMessage) errorMessage = 'Por favor, preencha seu telefone.';
                telefone.style.borderColor = '#ff4444';
            } else {
                telefone.style.borderColor = '';
            }
            
            if (!mensagem.value.trim()) {
                isValid = false;
                if (!errorMessage) errorMessage = 'Por favor, preencha sua mensagem.';
                mensagem.style.borderColor = '#ff4444';
            } else {
                mensagem.style.borderColor = '';
            }
            
            if (isValid) {
                // Simula o envio do formulário
                showFormSuccess();
                form.reset();
            } else {
                showFormError(errorMessage);
            }
        });
        
        // Remove borda de erro ao digitar
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Exibe mensagem de sucesso
 */
function showFormSuccess() {
    // Remove mensagens anteriores
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria mensagem de sucesso
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Em breve entraremos em contato.';
    
    // Insere antes do formulário
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Exibe mensagem de erro
 */
function showFormError(message) {
    // Remove mensagens anteriores
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria mensagem de erro
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message error';
    messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    
    // Insere antes do formulário
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

/**
 * Scroll to Top Button
 * Botão para voltar ao topo da página
 */
function initScrollToTop() {
    // Cria o botão
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollBtn);
    
    // Controla visibilidade
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll para o topo ao clicar
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Adiciona estilos para as mensagens do formulário
 */
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 1rem 1.5rem;
        border-radius: 5px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-message.success {
        background: rgba(0, 200, 83, 0.1);
        border: 1px solid #00C853;
        color: #00C853;
    }
    
    .form-message.error {
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid #ff4444;
        color: #ff4444;
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #00C853;
        color: #121212;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999;
        box-shadow: 0 5px 20px rgba(0, 200, 83, 0.4);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background: #009624;
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);

/**
 * Efeito de parallax suave no hero
 */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.backgroundPositionY = rate + 'px';
    }
});

/**
 * Máscara simples para telefone
 */
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 2) {
                value = '(' + value;
            } else if (value.length <= 7) {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
            } else {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);
            }
        }
        e.target.value = value;
    });
}

