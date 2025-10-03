// ============================================================================
// SCRIPT PRINCIPAL - PORTFOLIO PROFESIONAL
// ============================================================================
// 
// Este archivo contiene toda la lógica de funcionalidad del portfolio.
// La configuración de proyectos se encuentra en projects-config.js
//

// DOM Elements
let projectsGrid, modal, modalClose, filterBtns, contactForm, particlesContainer;
let nav, navMenu, navToggle;
let projectsSwiper;

// Initialize DOM elements when document is ready
function initializeDOMElements() {
    projectsGrid = document.getElementById('projectsGrid');
    modal = document.getElementById('projectModal');
    modalClose = document.querySelector('.modal-close');
    filterBtns = document.querySelectorAll('.filter-btn');
    contactForm = document.getElementById('contactForm');
    particlesContainer = document.getElementById('particles');
    nav = document.querySelector('.nav');
    navMenu = document.getElementById('navMenu');
    navToggle = document.getElementById('navToggle');
}

// Current filter
let currentFilter = 'all';

const TECHNOLOGY_ICON_MAP = {
    'Angular': 'devicon-angularjs-plain colored',
    'Amazon S3': 'devicon-amazonwebservices-plain colored',
    'CloudFront': 'devicon-amazonwebservices-plain colored',
    'Route 53': 'devicon-amazonwebservices-plain colored',
    'Certificate Manager': 'fas fa-certificate text-amber-300',
    'Docker': 'devicon-docker-plain colored',
    'Kubernetes': 'devicon-kubernetes-plain colored',
    'Minikube': 'devicon-kubernetes-plain colored',
    'YAML': 'devicon-yaml-plain colored',
    'Node.js': 'devicon-nodejs-plain colored',
    'Amazon ECR': 'devicon-amazonwebservices-plain colored',
    'EC2': 'devicon-amazonwebservices-plain colored',
    'VPC': 'devicon-amazonwebservices-plain colored',
    'MongoDB': 'devicon-mongodb-plain colored',
    'Amazon SES': 'devicon-amazonwebservices-plain colored'
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
        : projects.filter(project => project.tags.includes(filter));

    console.log('Filtered projects:', filteredProjects.length);

    filteredProjects.forEach((project, index) => {
        const projectSlide = createProjectSlide(project, index);
        projectsGrid.appendChild(projectSlide);
    });

    requestAnimationFrame(() => {
        initializeProjectsSwiper(filteredProjects.length);
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
        <div class="tech-pill group/tech flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-left shadow-[0_22px_44px_-32px_rgba(14,165,233,0.75)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow">
            <span class="tech-icon flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 shadow-inner transition-transform duration-500 group-hover/tech:scale-110">
                ${iconMarkup}
            </span>
            <span class="tech-pill-label text-sm font-semibold tracking-wide text-slate-200">${tech}</span>
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

// Create project slide element
function createProjectSlide(project, index) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide h-auto';

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

    card.innerHTML = `
        <div class="project-stack-wrapper relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-6">
            <div class="stack-badge absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-slate-200/80">
                <span class="block h-1 w-1 rounded-full bg-accent/80"></span>
                Stack principal
            </div>
            <div class="project-stack-grid relative z-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                ${badgesMarkup}
            </div>
        </div>
        <div class="project-info flex flex-1 flex-col gap-4">
            <h3 class="text-xl font-semibold text-white">${project.title}</h3>
            <p class="project-description text-base text-slate-300">${project.description}</p>
        </div>
    `;

    slide.appendChild(card);
    return slide;
}

function initializeProjectsSwiper(totalSlides) {
    const swiperContainer = document.querySelector('.projects-swiper');
    if (!swiperContainer) return;

    if (projectsSwiper) {
        projectsSwiper.destroy(true, true);
        projectsSwiper = null;
    }

    if (totalSlides === 0) {
        return;
    }

    const shouldLoop = totalSlides > 1;

    projectsSwiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: shouldLoop,
        speed: 600,
        grabCursor: true,
        centeredSlides: totalSlides === 1,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        observer: true,
        observeParents: true,
        breakpoints: {
            768: {
                slidesPerView: Math.min(2, totalSlides),
                spaceBetween: 28
            },
            1280: {
                slidesPerView: Math.min(3, totalSlides),
                spaceBetween: 32
            }
        },
        pagination: {
            el: '.projects-pagination',
            clickable: true
        }
    });
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
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');

    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.fullDescription;

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
    if (!nav) return;

    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            navMenu.classList.toggle('hidden', !isActive);
            navMenu.classList.toggle('flex', isActive);
            navToggle.classList.toggle('active', isActive);
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navMenu.classList.add('hidden');
                    navMenu.classList.remove('flex');
                }

                if (navToggle && navToggle.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            if (navMenu) {
                navMenu.classList.remove('hidden');
                navMenu.classList.add('flex');
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        } else if (navMenu && !navMenu.classList.contains('active')) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
        }
    });

    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
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