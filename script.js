// ============================================================================
// SCRIPT PRINCIPAL - PORTFOLIO PROFESIONAL
// ============================================================================
// 
// Este archivo contiene toda la lógica de funcionalidad del portfolio.
// La configuración de proyectos se encuentra en projects-config.js
//

// DOM Elements
let projectsGrid, modal, modalClose, filterBtns, contactForm, particlesContainer;
let nav, navMenu, navToggle, navBackdrop;

// Initialize DOM elements when document is ready
function initializeDOMElements() {
    projectsGrid = document.getElementById('projectsGrid');
    modal = document.getElementById('projectModal');
    modalClose = document.querySelector('.modal-close');
    filterBtns = document.querySelectorAll('.filter-btn');
    contactForm = document.getElementById('contactForm');
    particlesContainer = document.getElementById('particles');
    nav = document.querySelector('.site-nav');
    navMenu = document.getElementById('navMenu');
    navToggle = document.getElementById('navToggle');
    navBackdrop = document.querySelector('.nav-backdrop');
}

// Current filter
let currentFilter = 'all';

const TECHNOLOGY_ICON_MAP = {
    'Angular': 'fa-brands fa-angular',
    'Amazon S3': 'fa-solid fa-database',
    'CloudFront': 'fa-solid fa-globe',
    'Route 53': 'fa-solid fa-route',
    'Certificate Manager': 'fa-solid fa-shield-halved',
    'Docker': 'fa-brands fa-docker',
    'Kubernetes': 'fa-solid fa-network-wired',
    'Minikube': 'fa-solid fa-cubes',
    'YAML': 'fa-solid fa-code',
    'Node.js': 'fa-brands fa-node-js',
    'Amazon ECR': 'fa-solid fa-layer-group',
    'EC2': 'fa-solid fa-server',
    'VPC': 'fa-solid fa-diagram-project',
    'MongoDB': 'fa-solid fa-leaf',
    'Amazon SES': 'fa-solid fa-envelope-open-text'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    loadProjects();
    initializeModal();
    initializeAnimations();
    initializeContactForm();
    initializeProjectFilter();
    initializeParticles();
    initializeTechStack();
    initializeScrollAnimations();
    initializeNavigation();
});

// Load projects into the grid
function loadProjects(filter = 'all') {
    console.log('Loading projects...', projects.length, 'projects found');

    if (!projectsGrid) {
        console.error('Projects grid element not found!');
        return;
    }

    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => Array.isArray(project.tags) && project.tags.includes(filter));

    console.log('Filtered projects:', filteredProjects.length);

    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });

    // Trigger animation
    setTimeout(() => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => card.classList.add('animate-in'));
    }, 100);
}

function createTechnologyBadges(technologies = []) {
    if (!Array.isArray(technologies) || technologies.length === 0) {
        return '';
    }

    return technologies.map(tech => createTechnologyBadge(tech)).join('');
}

function createTechnologyBadge(tech) {
    const iconClass = TECHNOLOGY_ICON_MAP[tech];
    const iconMarkup = iconClass
        ? `<i class="${iconClass}" aria-hidden="true"></i>`
        : `<span class="tech-icon-initial" aria-hidden="true">${getTechnologyInitials(tech)}</span>`;

    return `
        <div class="tech-pill group/tech">
            <span class="tech-icon" aria-hidden="true">
                ${iconMarkup}
            </span>
            <span class="tech-pill-label">${tech}</span>
        </div>
    `;
}

function getTechnologyInitials(tech) {
    if (typeof tech !== 'string' || tech.trim().length === 0) {
        return '';
    }

    const tokens = tech.trim().split(/\s+/).slice(0, 2);
    const initials = tokens.map(token => {
        const cleaned = token.replace(/[^A-Za-z0-9]/g, '');
        return cleaned.charAt(0) || token.charAt(0);
    });

    return initials.join('').toUpperCase();
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card group flex h-full cursor-pointer flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent/70';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => openModal(project);
    card.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            openModal(project);
        }
    });

    const badgesMarkup = createTechnologyBadges(project.technologies);
    const technologyClasses = ['project-technologies'];

    if (project.technologiesAlign === 'top') {
        technologyClasses.push('align-top');
    }
    const iconClass = project.iconClass || 'fa-solid fa-diagram-project';
    const iconStyles = [];

    if (project.iconBackground) {
        iconStyles.push(`background: ${project.iconBackground}`);
    }

    if (project.iconColor) {
        iconStyles.push(`color: ${project.iconColor}`);
    }

    const iconStyleAttribute = iconStyles.length > 0
        ? ` style="${iconStyles.join('; ')}"`
        : '';

    card.innerHTML = `
        <div class="project-media relative overflow-hidden rounded-2xl border border-white/10">
            <div class="project-media-overlay"></div>
            <div class="project-icon-wrapper">
                <div class="project-icon"${iconStyleAttribute}>
                    <i class="${iconClass}" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div class="project-content flex flex-1 flex-col gap-4">
            <div>
                <h3 class="project-title text-xl font-semibold text-white">${project.title}</h3>
                <p class="project-description text-base text-slate-300">${project.description}</p>
            </div>
            <div class="${technologyClasses.join(' ')}">
                ${badgesMarkup}
            </div>
        </div>
    `;

    return card;
}

// Project filter functionality
function initializeProjectFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered projects
            currentFilter = filter;
            loadProjects(filter);
        });
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
function initializeModal() {
    if (!modal || !modalClose) return;

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        const modalVisible = !modal.classList.contains('hidden');
        if (e.key === 'Escape' && modalVisible) {
            closeModal();
        }
    });

    modalClose.addEventListener('click', closeModal);
}

// Open project modal
function openModal(project) {
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;

    if (modalIcon) {
        const iconClass = project.iconClass || 'fa-solid fa-diagram-project';
        const iconStyles = [];

        if (project.iconBackground) {
            iconStyles.push(`background: ${project.iconBackground}`);
        }

        if (project.iconColor) {
            iconStyles.push(`color: ${project.iconColor}`);
        }

        modalIcon.className = `modal-icon`;
        if (iconStyles.length > 0) {
            modalIcon.setAttribute('style', iconStyles.join('; '));
        } else {
            modalIcon.removeAttribute('style');
        }

        modalIcon.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
    }

    modalTechnologies.innerHTML = project.technologies.map(tech =>
        `<span class="modal-tech-tag">${tech}</span>`
    ).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        requestAnimationFrame(() => {
            modalContent.classList.add('modal-open');
        });
    }
}

// Close modal
function closeModal() {
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.remove('modal-open');
    }

    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 150);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-card, .contact-card, .about-card, .education-item, .certification-card').forEach(el => {
        observer.observe(el);
    });
}





// Initialize contact form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            const subject = encodeURIComponent('Contacto desde el portfolio');
            const bodyLines = [
                `Nombre: ${data.name || ''}`,
                `Email: ${data.email || ''}`,
                '',
                'Mensaje:',
                data.message || ''
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));
            const mailtoLink = `mailto:tperticaro@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;

            showNotification('Mensaje enviado correctamente. Serás redirigido a tu correo para enviarlo.', 'success');
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize particles
function initializeParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize tech stack interactions
function initializeTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            this.style.transform = 'translateY(-10px) scale(1.2)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            showNotification(`Tecnología: ${tech}`, 'info');
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));
}

// Initialize navigation interactions
function initializeNavigation() {
    if (!nav || !navMenu || !navToggle) {
        return;
    }

    const desktopBreakpoint = window.matchMedia('(min-width: 1024px)');
    const navLinks = Array.from(navMenu.querySelectorAll('a'));
    let closeMenuTimeoutId = null;

    const setMenuVisibility = (isHidden) => {
        navMenu.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
    };

    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    const openMenu = () => {
        if (desktopBreakpoint.matches) {
            return;
        }

        if (closeMenuTimeoutId) {
            clearTimeout(closeMenuTimeoutId);
            closeMenuTimeoutId = null;
        }

        navMenu.classList.remove('hidden');
        navMenu.classList.add('flex');

        requestAnimationFrame(() => {
            navMenu.classList.add('open');
        });

        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.classList.add('is-active');
        navBackdrop?.classList.add('is-visible');
        document.body.classList.add('nav-open');
        setMenuVisibility(false);
    };

    const closeMenu = (immediate = false) => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navBackdrop?.classList.remove('is-visible');
        document.body.classList.remove('nav-open');
        setMenuVisibility(true);

        const delay = immediate ? 0 : 260;

        if (closeMenuTimeoutId) {
            clearTimeout(closeMenuTimeoutId);
        }

        closeMenuTimeoutId = setTimeout(() => {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
            closeMenuTimeoutId = null;
        }, delay);
    };

    const toggleMenu = () => {
        if (desktopBreakpoint.matches) {
            return;
        }

        const isOpen = navMenu.classList.contains('open') && !navMenu.classList.contains('hidden');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    navToggle.addEventListener('click', toggleMenu);

    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => closeMenu());
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!desktopBreakpoint.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (desktopBreakpoint.matches) {
            return;
        }

        if (!nav.contains(event.target)) {
            const isOpen = navMenu.classList.contains('open') && !navMenu.classList.contains('hidden');

            if (isOpen) {
                closeMenu();
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !desktopBreakpoint.matches) {
            const isOpen = navMenu.classList.contains('open') && !navMenu.classList.contains('hidden');

            if (isOpen) {
                closeMenu();
            }
        }
    });

    const syncMenuToViewport = () => {
        if (desktopBreakpoint.matches) {
            if (closeMenuTimeoutId) {
                clearTimeout(closeMenuTimeoutId);
                closeMenuTimeoutId = null;
            }

            navMenu.classList.remove('hidden', 'open');
            navMenu.classList.add('flex');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
            navBackdrop?.classList.remove('is-visible');
            document.body.classList.remove('nav-open');
            setMenuVisibility(false);
        } else {
            closeMenu(true);
        }
    };

    if (typeof desktopBreakpoint.addEventListener === 'function') {
        desktopBreakpoint.addEventListener('change', syncMenuToViewport);
    } else if (typeof desktopBreakpoint.addListener === 'function') {
        desktopBreakpoint.addListener(syncMenuToViewport);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    syncMenuToViewport();
}

// Add CSS for notifications
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(15, 23, 42, 0.95);
    color: #e2e8f0;
    border-radius: 1rem;
    box-shadow: 0 30px 70px -30px rgba(14, 165, 233, 0.45);
    padding: 16px 22px;
    transform: translateX(420px);
    transition: transform 0.35s ease, opacity 0.35s ease;
    z-index: 10000;
    border: 1px solid rgba(148, 163, 184, 0.2);
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification i {
    color: #38bdf8;
    font-size: 18px;
}

.notification.notification-error {
    border-color: rgba(248, 113, 113, 0.65);
}

.notification.notification-error i {
    color: #ef4444;
}

.notification.notification-warning {
    border-color: rgba(234, 179, 8, 0.65);
}

.notification.notification-warning i {
    color: #f59e0b;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);